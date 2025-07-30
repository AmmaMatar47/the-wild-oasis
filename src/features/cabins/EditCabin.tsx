import { getCabinById } from "@/services/api/cabinsApi";
import Separator from "@/components/Separator";
import {
  Dialog,
  Field,
  Stack,
  Textarea,
  FileUploadFileChangeDetails,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import { Tooltip } from "@/components/ui/tooltip";
import { cabinFormValidation, formInitialValues } from "./cabinsFormConfig";
import { CabinType, ImageFileType } from "@/types/cabinsTypes";
import Button from "@/components/Button";
import ImageUploadField from "@/components/ImageUploadField";
import { useSearchParams } from "react-router";
import Spinner from "@/components/Spinner/Spinner";
import { useEditCabin } from "./useEditCabin";

const EditCabin = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutate: editCabin, isEditing } = useEditCabin();
  const [isLoading, setIsLoading] = useState(true);
  const [cabinData, setCabinData] = useState<CabinType>();
  const [searchParams, setSearchParams] = useSearchParams();
  const cabinId = searchParams.get("edit");

  const formik = useFormik({
    initialValues: cabinData ? cabinData : formInitialValues,
    validationSchema: cabinFormValidation,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    const fetchCabin = async () => {
      if (open) setIsLoading(true);
      if (cabinId) {
        const res = await getCabinById(cabinId);
        setCabinData(res);
        setIsLoading(false);
      }
    };
    fetchCabin();
  }, [searchParams, cabinId, open]);

  const removeEditCabinURlParam = () => {
    setSearchParams((prevParams) => {
      prevParams.delete("edit");
      return prevParams;
    });
  };

  async function handleSubmit(values: CabinType) {
    if (!formik.dirty || cabinId === null) return;

    const commonOptions = {
      onSuccess: () => {
        setOpen(false);
        removeEditCabinURlParam();
      },
    };

    if (cabinData?.image !== values.image) {
      const file = values.image as ImageFileType;
      const bucketName = `object/cabin-images/${file.name}`;
      editCabin(
        {
          cabinId,
          values,
          bucketName,
          imagePath: cabinData?.image as string,
        },
        commonOptions,
      );
    } else {
      editCabin({ cabinId, values }, commonOptions);
    }
  }

  const handleFileChange = (files: FileUploadFileChangeDetails) => {
    if (!formik.touched.image) formik.setFieldTouched("image", true);
    if (!files?.acceptedFiles?.[0] && cabinData) {
      // Return old image path in case the picked image is removed
      formik.setFieldValue("image", cabinData.image);
      return;
    }
    const file: File = files.acceptedFiles[0];
    formik.setFieldValue("image", file);
  };

  return (
    <Dialog.Root
      placement="center"
      size="xl"
      lazyMount
      open={open}
      onOpenChange={(e) => {
        removeEditCabinURlParam();
        setOpen(e.open);
      }}
      scrollBehavior="inside"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bgColor="var(--color-grey-0)">
          <Dialog.Header>
            <Dialog.Title color="var(--color-grey-800)">
              Edit cabin
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body paddingTop="8">
            {isLoading ? (
              <Spinner />
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <Stack
                  gap="4"
                  css={{ "--field-label-width": "148px" }}
                  color="var(--color-grey-700)"
                  marginBottom="2.4rem"
                >
                  <InputField
                    name="name"
                    label="Cabin name"
                    value={formik.values.name}
                    errorMessage={formik.errors.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!formik.errors.name && formik.touched.name}
                    disabled={isEditing}
                    required
                  />
                  <Separator />

                  <InputField
                    type="number"
                    name="maxCapacity"
                    label="Maximum capacity"
                    value={formik.values.maxCapacity}
                    errorMessage={formik.errors.maxCapacity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      !!formik.errors.maxCapacity && formik.touched.maxCapacity
                    }
                    disabled={isEditing}
                    required
                  />

                  <Separator />

                  <InputField
                    type="number"
                    name="regularPrice"
                    label="Regular price"
                    value={formik.values.regularPrice}
                    errorMessage={formik.errors.regularPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      !!formik.errors.regularPrice &&
                      formik.touched.regularPrice
                    }
                    disabled={isEditing}
                    required
                  />

                  <Separator />

                  <InputField
                    type="number"
                    name="discount"
                    label="Discount"
                    value={formik.values.discount}
                    errorMessage={formik.errors.discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      !!formik.errors.discount && formik.touched.discount
                    }
                    disabled={isEditing}
                    required
                  />

                  <Separator />

                  <Field.Root
                    justifyContent="start"
                    gap="6.2rem"
                    orientation="horizontal"
                    invalid={
                      !!formik.errors.description && formik.touched.description
                    }
                    disabled={isEditing}
                  >
                    <Field.Label>
                      Description <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea
                      name="description"
                      maxW="16.8rem"
                      minH="6.2rem"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      focusRingColor="var(--color-brand-600)"
                      boxShadow="var(--shadow-sm)"
                      border={
                        formik.errors.description && formik.touched.description
                          ? ""
                          : `solid 1px var(--color-grey-300)`
                      }
                      resize="none"
                    />
                    <Field.ErrorText>
                      {formik.errors.description}
                    </Field.ErrorText>
                  </Field.Root>

                  <Separator />

                  <ImageUploadField
                    marginLeft="4rem"
                    label="Cabin image"
                    onFileChange={handleFileChange}
                    invalid={!!formik.errors.image && !!formik.touched.image}
                    errorMessage={formik.errors.image}
                  />
                </Stack>

                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      variant="outline"
                      color="var(--color-grey-700)"
                      bgColor="var(--color-grey-0)"
                      _hover={{ bgColor: "var(--color-grey-100)" }}
                      borderColor="var(--color-grey-200)"
                      w="6.8rem"
                      borderRadius="sm"
                    >
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                  <Tooltip
                    content="Change one field at least to edit the cabin"
                    disabled={isEditing || formik.dirty}
                    openDelay={300}
                    closeDelay={300}
                  >
                    <Button
                      minW="6.8rem"
                      type="submit"
                      loading={isEditing}
                      disabled={!formik.dirty}
                    >
                      Edit Cabin
                    </Button>
                  </Tooltip>
                </Dialog.Footer>
              </form>
            )}{" "}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default EditCabin;
