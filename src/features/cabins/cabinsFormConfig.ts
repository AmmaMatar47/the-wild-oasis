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
    .required('This field is required'),
  description: Yup.string().required('This field is required'),
});
