import { FileUpload, Field, FileUploadRootProps } from "@chakra-ui/react";
import { LuFileImage } from "react-icons/lu";
import Button from "./Button";
import ImageUploadItem from "./ImageUploadItem";

interface ImageUploadFieldProps extends FileUploadRootProps {
  label: string;
  errorMessage: string | undefined;
  invalid: boolean;
}

const ImageUploadField = ({
  label,
  errorMessage,
  invalid,
  ...props
}: ImageUploadFieldProps) => {
  return (
    <Field.Root
      orientation="horizontal"
      justifyContent="start"
      invalid={invalid}
    >
      <Field.Label minW="11rem" color="var(--color-grey-700)" alignSelf="start">
        {label}
      </Field.Label>

      <FileUpload.Root
        flexDir="row"
        accept="image/*"
        name="image"
        maxW="20rem"
        {...props}
      >
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button size="sm" fontSize="sm">
            <LuFileImage /> Upload image
          </Button>
        </FileUpload.Trigger>
        <ImageUploadItem />
      </FileUpload.Root>
      <Field.ErrorText>{errorMessage}</Field.ErrorText>
    </Field.Root>
  );
};

export default ImageUploadField;
