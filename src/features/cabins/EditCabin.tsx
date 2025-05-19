import { editCabin, ImageFileType, CabinType } from "@/services/api/cabinsApi";
import {
  Button,
  Dialog,
  Field,
  FileUpload,
  FileUploadList,
  Separator,
  Stack,
  Textarea,
  FileUploadFileChangeDetails,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { LuFileImage } from "react-icons/lu";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { Tooltip } from "@/components/ui/tooltip";
import { cabinFormValidation, formInitialValues } from "./CreateCabin";

const EditCabin = ({
  open,
  setOpen,
  cabinValues,
  cabinId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cabinValues?: CabinType;
  cabinId?: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: cabinValues ? cabinValues : formInitialValues,
    validationSchema: cabinFormValidation,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  async function handleSubmit(values: CabinType) {
    try {
      if (!formik.dirty || cabinValues === undefined || cabinId === undefined)
        return;
      if (cabinValues.image !== values.image) {
        const file = values.image as ImageFileType;
        const bucketName = `object/cabin-images/${file.name}`;
        const filePath = `${import.meta.env.VITE_WILD_OASIS_STORAGE_URL}/${bucketName}`;
        const cabinData = { ...values, image: filePath };
        await editCabin(cabinId, cabinData, bucketName, file);
      } else {
        await editCabin(cabinId, values);
      }
      setOpen(false);
    } catch {
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileChange = (files: FileUploadFileChangeDetails) => {
    if (!files?.acceptedFiles?.[0]) return;

    const file: File = files.acceptedFiles[0];
    formik.setFieldValue("image", file);
  };

  return (
    <Dialog.Root
      placement="center"
      size="xl"
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title color="var(--color-grey-800)">
              Edit cabin
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body paddingTop="8">
            <form onSubmit={formik.handleSubmit}>
              <Stack
                gap="5"
                css={{ "--field-label-width": "148px" }}
                color="var(--color-grey-700)"
              >
                <InputField
                  name="name"
                  label="Cabin name"
                  value={formik.values.name}
                  errorMessage={formik.errors.name}
                  onChange={formik.handleChange}
                  invalid={!!formik.errors.name}
                  disabled={isLoading}
                />
                <Separator />

                <InputField
                  type="number"
                  name="maxCapacity"
                  label="Maximum capacity"
                  value={formik.values.maxCapacity}
                  errorMessage={formik.errors.maxCapacity}
                  onChange={formik.handleChange}
                  invalid={!!formik.errors.maxCapacity}
                  disabled={isLoading}
                />

                <Separator />

                <InputField
                  type="number"
                  name="regularPrice"
                  label="Regular price"
                  value={formik.values.regularPrice}
                  errorMessage={formik.errors.regularPrice}
                  onChange={formik.handleChange}
                  invalid={!!formik.errors.regularPrice}
                  disabled={isLoading}
                />

                <Separator />

                <InputField
                  type="number"
                  name="discount"
                  label="Discount"
                  value={formik.values.discount}
                  errorMessage={formik.errors.discount}
                  onChange={formik.handleChange}
                  invalid={!!formik.errors.discount}
                  disabled={isLoading}
                />

                <Separator />

                <Field.Root
                  justifyContent="start"
                  gap="6.2rem"
                  orientation="horizontal"
                  invalid={!!formik.errors.description}
                  disabled={isLoading}
                >
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    name="description"
                    focusRingColor="var(--color-brand-600)"
                    maxW="16.8rem"
                    minH="fit-content"
                    maxH="8lh"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  <Field.ErrorText>{formik.errors.description}</Field.ErrorText>
                </Field.Root>

                <Separator />

                <Field.Root
                  justifyContent="start"
                  gap="6.2rem"
                  orientation="horizontal"
                  marginBottom="2.4rem"
                  disabled={isLoading}
                >
                  <Field.Label>Cabin photo</Field.Label>

                  <FileUpload.Root
                    accept="image/*"
                    name="image"
                    onFileChange={(files) => handleFileChange(files)}
                    flexDirection="row"
                    maxW="20rem"
                  >
                    <FileUpload.HiddenInput />
                    <FileUpload.Trigger asChild>
                      <Button
                        variant="outline"
                        size="md"
                        color="var(--color-grey-700)"
                      >
                        <LuFileImage /> Upload Images
                      </Button>
                    </FileUpload.Trigger>
                    <FileUploadList clearable />
                  </FileUpload.Root>
                </Field.Root>
              </Stack>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Tooltip
                  content="Change one field at least to edit the cabin"
                  disabled={isLoading || formik.dirty}
                >
                  <Button
                    type="submit"
                    color="var(--color-grey-100)"
                    bgColor="var(--color-brand-500)"
                    _hover={{ bgColor: "var(--color-brand-700)" }}
                    disabled={isLoading || !formik.dirty}
                  >
                    Edit
                  </Button>
                </Tooltip>
              </Dialog.Footer>
            </form>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default EditCabin;
