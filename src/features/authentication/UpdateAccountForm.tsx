import Button from "@/components/Button";
import ImageUploadItem from "@/components/ImageUploadItem";
import InputField from "@/components/InputField";
import Separator from "@/components/Separator";
import { Tooltip } from "@/components/ui/tooltip";
import { ImageFileType } from "@/types/cabinsTypes";
import { MAX_IMAGE_SIZE, SUPPORTED_IMAGE_FORMATS } from "@/utils/constants";
import {
  Field,
  FileUpload,
  FileUploadFileChangeDetails,
  Flex,
  useFileUpload,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { LuFileImage } from "react-icons/lu";
import * as Yup from "yup";
import { UserDataRes } from "../../types/authTypes";
import { useUpdateAccount } from "./useUpdateAccount";

export interface UpdateAccountFormType {
  fullName: string;
  avatarFile: null | ImageFileType;
}

const updateUserValidation = Yup.object().shape({
  fullName: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^(?![_. ])(?!.*[_. ]{2})[a-zA-Z0-9._ ]+(?<![_. ])$/,
      "Invalid username format",
    ),
  avatarFile: Yup.mixed<File>()
    .nullable()
    .test("is-valid-type", "Only JPEG, PNG, or WEBP images", (value) => {
      if (!value) return true;

      if (value instanceof File) {
        return SUPPORTED_IMAGE_FORMATS.includes(value.type);
      }

      return true;
    })
    .test("is-valid-size", "File too large (max 2MB)", (value) => {
      if (!value) return true;

      if (value instanceof File) {
        return value.size <= MAX_IMAGE_SIZE;
      }

      return true;
    }),
});

const UpdateAccountForm = ({ user }: { user: UserDataRes | undefined }) => {
  const { mutate, isPending } = useUpdateAccount();
  const fileUpload = useFileUpload({
    accept: "image/*",
    name: "image",
    onFileChange: handleFileChange,
    disabled: isPending,
  });

  const formInitialValues = {
    fullName: user?.user_metadata.fullName || "",
    avatarFile: null,
  };
  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: handleSubmit,
    validationSchema: updateUserValidation,
    enableReinitialize: true,
  });

  function handleSubmit(values: UpdateAccountFormType) {
    mutate(
      { values: values, avatarPath: user?.user_metadata.avatar },
      {
        onSuccess() {
          formik.resetForm();
          fileUpload.clearFiles();
        },
      },
    );
  }

  function handleFileChange(files: FileUploadFileChangeDetails) {
    if (!formik.touched.avatarFile) formik.setFieldTouched("avatarFile", true);

    if (files.acceptedFiles.length === 0)
      formik.setFieldValue("avatarFile", null);
    if (!files?.acceptedFiles?.[0]) return;

    const file: File = files.acceptedFiles[0];
    formik.setFieldValue("avatarFile", file);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Tooltip
        content={`You can't change the email address`}
        closeDelay={200}
        openDelay={200}
      >
        <InputField
          label="Email"
          defaultValue={user?.user_metadata.email}
          minW="26rem"
          labelWidth="13rem"
          disabled={true}
        />
      </Tooltip>
      <Separator marginY="1.4rem" />
      <InputField
        name="fullName"
        label="Username"
        labelWidth="13rem"
        minW="26rem"
        defaultValue={user?.user_metadata.fullName}
        value={formik.values.fullName}
        errorMessage={formik.errors.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        invalid={!!formik.errors.fullName && !!formik.touched.fullName}
        disabled={isPending}
      />

      <Separator marginY="1.4rem" />

      <Field.Root
        orientation="horizontal"
        justifyContent="start"
        invalid={!!formik.errors.avatarFile && !!formik.touched.avatarFile}
      >
        <Field.Label
          minW="11rem"
          color="var(--color-grey-700)"
          alignSelf="start"
        >
          Profile image
        </Field.Label>
        <FileUpload.RootProvider value={fileUpload} flexDir="row" maxW="20rem">
          <FileUpload.HiddenInput />
          <FileUpload.Trigger asChild>
            <Button size="sm" fontSize="sm" marginLeft="7.9rem">
              <LuFileImage /> Upload image
            </Button>
          </FileUpload.Trigger>
          <ImageUploadItem />
        </FileUpload.RootProvider>
        <Field.ErrorText>{formik.errors.avatarFile}</Field.ErrorText>
      </Field.Root>

      <Flex justifyContent="end" marginTop="1.6rem">
        <Tooltip
          content="Make at least one change to update"
          disabled={formik.dirty}
          openDelay={200}
          closeDelay={200}
        >
          <Button
            size="sm"
            fontSize="sm"
            type="submit"
            disabled={!formik.dirty}
            loading={isPending}
          >
            Update account
          </Button>
        </Tooltip>
      </Flex>
    </form>
  );
};

export default UpdateAccountForm;
