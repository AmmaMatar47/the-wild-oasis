import Separator from '@/components/Separator';
import { Dialog, Field, FileUploadFileChangeDetails, Stack, Textarea } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import InputField from '@/components/InputField';
import { cabinFormValidation, formInitialValues } from './cabinsFormConfig';
import { CabinType, ImageFileType } from '@/types/cabinsTypes';
import Button from '@/components/Button';
import ImageUploadField from '@/components/ImageUploadField';
import { useCreateCabin } from './useCreateCabin';

const CreateCabin = () => {
  const { mutate: createCabin, isPending } = useCreateCabin();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: cabinFormValidation,
    onSubmit: handleSubmit,
  });

  function handleSubmit(cabinData: CabinType) {
    const file = cabinData.image as ImageFileType;
    const bucketName = `object/cabin-images/${file.name}`;
    createCabin(
      { cabinData, bucketName },
      {
        onSuccess() {
          setIsFormOpen(false);
        },
      }
    );
  }

  const handleFileChange = (files: FileUploadFileChangeDetails) => {
    if (!formik.touched.image) formik.setFieldTouched('image', true);
    if (!files?.acceptedFiles?.[0]) {
      formik.setFieldValue('image', '');
      return;
    }

    const file: File = files.acceptedFiles[0];
    formik.setFieldValue('image', file);
  };

  return (
    <Dialog.Root
      placement='center'
      size='xl'
      open={isFormOpen}
      onOpenChange={e => {
        if (e) formik.resetForm();
        setIsFormOpen(e.open);
      }}
      scrollBehavior='inside'
    >
      <Dialog.Trigger asChild>
        <Button h='2.4rem'>Add new cabin</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bgColor='var(--color-grey-0)'>
          <Dialog.Header>
            <Dialog.Title color='var(--color-grey-800)'>Create cabin</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body paddingTop='8'>
            <form onSubmit={formik.handleSubmit}>
              <Stack
                gap='4'
                css={{ '--field-label-width': '148px' }}
                color='var(--color-grey-700)'
                marginBottom='2.4rem'
              >
                <InputField
                  name='name'
                  label='Cabin name'
                  value={formik.values.name}
                  errorMessage={formik.errors.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={!!formik.errors.name && formik.touched.name}
                  disabled={isPending}
                  required
                />

                <Separator />

                <InputField
                  type='number'
                  name='maxCapacity'
                  label='Maximum capacity'
                  value={formik.values.maxCapacity}
                  errorMessage={formik.errors.maxCapacity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={!!formik.errors.maxCapacity && formik.touched.maxCapacity}
                  disabled={isPending}
                  required
                />

                <Separator />

                <InputField
                  type='number'
                  name='regularPrice'
                  label='Regular price'
                  value={formik.values.regularPrice}
                  errorMessage={formik.errors.regularPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={!!formik.errors.regularPrice && formik.touched.regularPrice}
                  disabled={isPending}
                  required
                />

                <Separator />

                <InputField
                  type='number'
                  name='discount'
                  label='Discount'
                  value={formik.values.discount}
                  errorMessage={formik.errors.discount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={!!formik.errors.discount && formik.touched.discount}
                  disabled={isPending}
                  required
                />

                <Separator />

                <Field.Root
                  justifyContent='start'
                  gap='6.2rem'
                  orientation='horizontal'
                  invalid={!!formik.errors.description && formik.touched.description}
                  disabled={isPending}
                >
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    name='description'
                    maxW='16.8rem'
                    minH='6.2rem'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    focusRingColor='var(--color-brand-600)'
                    boxShadow='var(--shadow-sm)'
                    border={
                      formik.errors.description && formik.touched.description
                        ? ''
                        : `solid 1px var(--color-grey-300)`
                    }
                    resize='none'
                  />
                  <Field.ErrorText>{formik.errors.description}</Field.ErrorText>
                </Field.Root>

                <Separator />

                <ImageUploadField
                  marginLeft='4rem'
                  label='Cabin image'
                  onFileChange={handleFileChange}
                  invalid={!!formik.errors.image && !!formik.touched.image}
                  errorMessage={formik.errors.image}
                  disabled={isPending}
                  required
                />
              </Stack>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant='outline'
                    color='var(--color-grey-700)'
                    bgColor='var(--color-grey-0)'
                    _hover={{ bgColor: 'var(--color-grey-100)' }}
                    borderColor='var(--color-grey-200)'
                    w='6.8rem'
                  >
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  type='submit'
                  loading={isPending}
                  loadingText='Creating cabin...'
                  disabled={!formik.isValid}
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
