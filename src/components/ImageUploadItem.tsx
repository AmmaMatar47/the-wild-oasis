import { FileUpload, Float, useFileUploadContext } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';

const ImageUploadItem = () => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;

  return (
    <FileUpload.ItemGroup>
      {files.map(file => (
        <FileUpload.Item
          w='auto'
          bgColor='var(--color-grey-50)'
          borderColor='var(--color-grey-100)'
          boxSize='20'
          p='2'
          file={file}
        >
          <FileUpload.ItemPreviewImage />
          <Float placement='top-end'>
            <FileUpload.ItemDeleteTrigger
              boxSize='4'
              layerStyle='fill.solid'
              bgColor='var(--color-brand-500)'
              color='#fff'
            >
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

export default ImageUploadItem;
