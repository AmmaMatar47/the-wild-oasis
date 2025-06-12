import {
  FileUpload,
  Field,
  FileUploadList,
  FileUploadRootProps,
} from "@chakra-ui/react";
import Button from "./Button";
import { LuFileImage } from "react-icons/lu";

interface ImageUploadFieldProps extends FileUploadRootProps {
  label: string;
}

const ImageUploadField = ({ label, ...props }: ImageUploadFieldProps) => {
  return (
    <Field.Root orientation="horizontal" justifyContent="start">
      <Field.Label minW="11rem" color="var(--color-grey-700)">
        {label}
      </Field.Label>

      <FileUpload.Root
        accept="image/*"
        name="image"
        flexDir="row"
        maxW="20rem"
        {...props}
      >
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button
            variant="outline"
            size="sm"
            fontSize="sm"
            color="var(--color-grey-100)"
          >
            <LuFileImage /> Upload image
          </Button>
        </FileUpload.Trigger>
        <FileUploadList clearable />
      </FileUpload.Root>
    </Field.Root>
  );
};

export default ImageUploadField;
