import { MAX_IMAGE_SIZE, SUPPORTED_IMAGE_FORMATS } from '@/utils/constants';
import * as Yup from 'yup';

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
    .max(15, 'Name is too long')
    .required('This field is required')
    .matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Invalid name format'),
  maxCapacity: Yup.number()
    .min(1, 'Cabin should fit 1 guest at least')
    .required('This field is required'),
  regularPrice: Yup.number().required('This field is required'),
  discount: Yup.number()
    .min(0, `Discount can't be negative`)
    .max(Yup.ref('regularPrice'), 'Discount should be less than the regular price')
    .required('This field is required'),
  description: Yup.string().required('This field is required'),
  image: Yup.mixed<File | string>()
    .required('Please provide an image')
    .test('is-valid-type', 'Only JPEG, PNG, or WEBP images', value => {
      if (!value) return false;

      if (value instanceof File) {
        return SUPPORTED_IMAGE_FORMATS.includes(value.type);
      }

      if (typeof value === 'string') {
        return /\.(jpe?g|png|webp)$/i.test(value);
      }

      return false;
    })
    .test('is-valid-size', 'File too large (max 2MB)', value => {
      if (!value) return false;

      if (value instanceof File) {
        return value.size <= MAX_IMAGE_SIZE;
      }

      return true;
    }),
});
