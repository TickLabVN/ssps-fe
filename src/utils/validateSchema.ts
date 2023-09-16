import * as Yup from 'yup';
export const validateSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required!')
    .min(5, 'Username must be at least 5 characters'),
  password: Yup.string()
    .required('Password is required!')
    .min(8, 'Password must be at least 8 characters')
});
