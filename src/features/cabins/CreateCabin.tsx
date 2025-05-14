import { createCabin, ImageFileType, CabinType } from '@/services/api/cabinsApi';
import {
  Button,
  Dialog,
  Field,
  FileUpload,
  FileUploadList,
  Separator,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LuFileImage } from 'react-icons/lu';
import { useState } from 'react';
import InputField from '@/components/InputField';

export const formInitialValues = {
  name: '',
  maxCapacity: 1,
  regularPrice: 0,
  discount: 0,
  description: '',
  image: '',
};

export const cabinFormValidation = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name is too short')
    .max(15, 'Name is too long')
    .required('This field is required'),
  maxCapacity: Yup.number()
    .min(1, 'Cabin should fit 1 guest at least')
    .required('This field is required'),
  regularPrice: Yup.number().required('This field is required'),
  discount: Yup.number()
    .min(0, `Discount can't be negative`)
    .max(Yup.ref('regularPrice'), 'Discount should be less than the regular price')
    .required(),

  description: Yup.string().required('This field is required'),
});

const CreateCabin = () => {
  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: cabinFormValidation,
    onSubmit: handleSubmit,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function handleSubmit(values: CabinType) {
    const file = values.image as ImageFileType;
    const bucketName = `object/cabin-images/${file.name}`;
    const filePath = `${import.meta.env.VITE_WILD_OASIS_STORAGE_URL}/${bucketName}`;
    const cabinData = { ...values, image: filePath };
    setIsLoading(true);
    createCabin(cabinData, bucketName, file)
      .then(() => {
        setIsFormOpen(false);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Dialog.Root
      placement='center'
      size='xl'
      open={isFormOpen}
      onOpenChange={e => setIsFormOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button
          size='lg'
          fontSize='.875rem'
          color='var(--color-grey-100)'
          bgColor='var(--color-brand-500)'
          _hover={{ bgColor: 'var(--color-brand-700)' }}
          borderRadius='4px'
          marginTop='8'
        >
          Add new cabin
        </Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title color='var(--color-grey-800)'>Create cabin</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body paddingTop='8'>
            <form onSubmit={formik.handleSubmit}>
              <Stack gap='5' css={{ '--field-label-width': '148px' }} color='var(--color-grey-700)'>
                <InputField
                  name='name'
                  label='Cabin name'
                  value={formik.values.name}
                  errorMessage={formik.errors.name}
                  onChange={formik.handleChange}
                  invalid={!!formik.errors.name}
                  disabled={isLoading}
                />

                <Separator />

                <InputField
                  type='number'
                  name='maxCapacity'
                  label='Maximum capacity'
                  value={formik.values.maxCapacity}
                  errorMessage={formik.errors.maxCapacity}
                  onChange={formik.handleChange}
                  invalid={!!formik.errors.maxCapacity}
                  disabled={isLoading}
                />

                <Separator />

                <InputField
                  type='number'
                  name='regularPrice'
                  label='Regular price'
                  value={formik.values.regularPrice}
                  errorMessage={formik.errors.regularPrice}
                  onChange={formik.handleChange}
                  invalid={!!formik.errors.regularPrice}
                  disabled={isLoading}
                />

                <Separator />

                <InputField
                  type='number'
                  name='discount'
                  label='Discount'
                  value={formik.values.discount}
                  errorMessage={formik.errors.discount}
                  onChange={formik.handleChange}
                  invalid={!!formik.errors.discount}
                  disabled={isLoading}
                />

                <Separator />

                <Field.Root
                  justifyContent='start'
                  gap='6.2rem'
                  orientation='horizontal'
                  invalid={!!formik.errors.description}
                  disabled={isLoading}
                >
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    name='description'
                    focusRingColor='var(--color-brand-600)'
                    maxW='16.8rem'
                    maxH='8lh'
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  <Field.ErrorText>{formik.errors.description}</Field.ErrorText>
                </Field.Root>

                <Separator />

                <Field.Root
                  justifyContent='start'
                  gap='6.2rem'
                  orientation='horizontal'
                  marginBottom='2.4rem'
                  disabled={isLoading}
                >
                  <Field.Label>Cabin photo</Field.Label>

                  <FileUpload.Root
                    accept='image/*'
                    name='image'
                    onFileChange={files => {
                      if (!files?.acceptedFiles?.[0]) return;

                      const file: File = files.acceptedFiles[0];
                      formik.setFieldValue('image', file);
                    }}
                    flexDirection='row'
                    maxW='20rem'
                  >
                    <FileUpload.HiddenInput />
                    <FileUpload.Trigger asChild>
                      <Button variant='outline' size='md' color='var(--color-grey-700)'>
                        <LuFileImage /> Upload Images
                      </Button>
                    </FileUpload.Trigger>
                    <FileUploadList clearable />
                  </FileUpload.Root>
                </Field.Root>
              </Stack>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant='outline'>Cancel</Button>
                </Dialog.ActionTrigger>
                <Button
                  type='submit'
                  color='var(--color-grey-100)'
                  bgColor='var(--color-brand-500)'
                  _hover={{ bgColor: 'var(--color-brand-700)' }}
                  disabled={isLoading}
                >
                  Create new cabin
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default CreateCabin;
