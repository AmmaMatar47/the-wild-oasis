import { createCabin, ImageFileType, NewCabinValues } from '@/services';
import {
  Button,
  Dialog,
  Field,
  FileUpload,
  FileUploadList,
  Input,
  Separator,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LuFileImage } from 'react-icons/lu';
import { toaster } from '@/components/ui/toaster';
import { useState } from 'react';

const formInitialValues: NewCabinValues = {
  name: '004',
  maxCapacity: 4,
  regularPrice: 56,
  discount: 1,
  description: 'nvf',
  image: '',
};

const cabinRequestSchema = Yup.object().shape({
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
    .max(Yup.ref('regularPrice'), 'Discount should be less than the regular price'),

  description: Yup.string().required('This field is required'),
});

const CreateCabin = () => {
  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: cabinRequestSchema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function handleSubmit(values: NewCabinValues) {
    const file = values.image as ImageFileType;
    const filePath = `cabin-images/${file.name}`;
    const bucketName = `object/cabin-images/${file.name}`;
    const cabinData = { ...values, image: filePath };
    setIsLoading(true);

    const createCabinRes = createCabin(cabinData, bucketName, file)
      .then(() => {
        setIsFormOpen(false);
      })
      .finally(() => setIsLoading(false));

    toaster.promise(createCabinRes, {
      success: {
        description: 'Cabin created successfully',
      },
      error: { description: 'Failed to create cabin' },
      loading: { description: 'Uploading...' },
    });
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
        >
          Add new cabin
        </Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Body paddingTop='8'>
            <form onSubmit={formik.handleSubmit}>
              <Stack gap='5' css={{ '--field-label-width': '148px' }} color='var(--color-grey-700)'>
                <Field.Root
                  justifyContent='start'
                  orientation='horizontal'
                  gap='6.2rem'
                  invalid={!!formik.errors.name}
                  disabled={isLoading}
                >
                  <Field.Label>Cabin name</Field.Label>
                  <Input
                    name='name'
                    focusRingColor='var(--color-brand-600)'
                    maxW='16.8rem'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <Field.ErrorText>{formik.errors.name}</Field.ErrorText>
                </Field.Root>

                <Separator />

                <Field.Root
                  justifyContent='start'
                  gap='6.2rem'
                  orientation='horizontal'
                  invalid={!!formik.errors.maxCapacity}
                  disabled={isLoading}
                >
                  <Field.Label>Maximum capacity</Field.Label>
                  <Input
                    name='maxCapacity'
                    type='number'
                    onChange={formik.handleChange}
                    value={formik.values.maxCapacity}
                    focusRingColor='var(--color-brand-600)'
                    maxW='16.8rem'
                  ></Input>
                  <Field.ErrorText>{formik.errors.maxCapacity}</Field.ErrorText>
                </Field.Root>

                <Separator />

                <Field.Root
                  justifyContent='start'
                  gap='6.2rem'
                  orientation='horizontal'
                  invalid={!!formik.errors.regularPrice}
                  disabled={isLoading}
                >
                  <Field.Label>Regular price</Field.Label>
                  <Input
                    name='regularPrice'
                    type='number'
                    onChange={formik.handleChange}
                    value={formik.values.regularPrice}
                    focusRingColor='var(--color-brand-600)'
                    maxW='16.8rem'
                  />
                  <Field.ErrorText>{formik.errors.regularPrice}</Field.ErrorText>
                </Field.Root>

                <Separator />

                <Field.Root
                  justifyContent='start'
                  gap='6.2rem'
                  orientation='horizontal'
                  invalid={!!formik.errors.discount}
                  disabled={isLoading}
                >
                  <Field.Label>Discount</Field.Label>
                  <Input
                    name='discount'
                    type='number'
                    onChange={formik.handleChange}
                    value={formik.values.discount}
                    focusRingColor='var(--color-brand-600)'
                    maxW='16.8rem'
                  />
                  <Field.ErrorText>{formik.errors.discount}</Field.ErrorText>
                </Field.Root>

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
