import Button from '@/components/Button';
import ImageUploadField from '@/components/ImageUploadField';
import InputField from '@/components/InputField';
import { Tooltip } from '@/components/ui/tooltip';
import { UserDataRes } from '../../types/authTypes';
import { Flex, Separator } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { updateAccount } from '@/services/api/authApi';
import { ImageFileType } from '@/types/cabinsTypes';
import * as Yup from 'yup';

export interface UpdateAccountFormType {
  fullName: string;
  avatarFile: null | ImageFileType;
}

const updateUserValidation = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name cannot exceed 20 characters')
    .required('User name is required'),
});

const UpdateAccountForm = ({ user }: { user: UserDataRes | undefined }) => {
  const formInitialValues = {
    fullName: user?.user_metadata.fullName || '',
    avatarFile: null,
  };
  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: handleSubmit,
    validationSchema: updateUserValidation,
  });

  async function handleSubmit(values: UpdateAccountFormType) {
    updateAccount(values, user?.user_metadata.avatar);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Tooltip content={`You can't change the email address`}>
        <InputField
          label='Email'
          defaultValue={user?.user_metadata.email}
          minW='26rem'
          disabled={true}
        />
      </Tooltip>
      <Separator marginY='1.4rem' />
      <InputField
        name='fullName'
        label='User name'
        minW='26rem'
        defaultValue={user?.user_metadata.fullName}
        value={formik.values.fullName}
        errorMessage={formik.errors.fullName}
        onChange={formik.handleChange}
        invalid={!!formik.errors.fullName}
      />

      <Separator marginY='1.4rem' />
      <ImageUploadField
        label='Profile image'
        onFileChange={files => {
          if (files.acceptedFiles.length === 0) formik.setFieldValue('avatarFile', null);
          if (!files?.acceptedFiles?.[0]) return;

          const file: File = files.acceptedFiles[0];
          formik.setFieldValue('avatarFile', file);
        }}
      />
      <Flex justifyContent='end' marginTop='1.6rem'>
        <Tooltip
          content='Make at least one change to update'
          disabled={formik.dirty}
          openDelay={200}
          closeDelay={200}
        >
          <Button size='sm' fontSize='sm' type='submit' disabled={!formik.dirty}>
            Update account
          </Button>
        </Tooltip>
      </Flex>
    </form>
  );
};

export default UpdateAccountForm;
