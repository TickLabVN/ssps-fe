import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useUserQuery } from '@hooks';
import { authService } from '@services';

export const AuthPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const [showPassword, setShowPassword] = useState<string>('password');
  const {
    info: { refetch }
  } = useUserQuery();

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .required('Username is required!')
      .min(5, 'Username must be at least 5 characters'),
    password: Yup.string()
      .required('Password is required!')
      .min(8, 'Password must be at least 8 characters')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(validateSchema)
  });

  const loginNormal = useMutation({
    mutationKey: ['loginNormal'],
    mutationFn: (data: LoginFormData) => authService.login(data)
  });

  const loginByGoogle = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  });

  const submit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await loginNormal.mutateAsync(data);
      await refetch();
      toast.success('Login successfully!');
      navigate('/home');
    } catch (err) {
      const errorMessage = (err as ResponseError).message;
      toast.error(errorMessage);
    }
  };

  return (
    <Card color='transparent' shadow={false}>
      <Typography className='text-[#030391] font-bold text-3xl leading-normal lg:mt-10'>
        Welcome!
      </Typography>
      <Typography className='text-[#1488D8] text-base font-normal'>
        Student Smart Printing Service (SSPS)
      </Typography>
      <form className='mt-20 mb-2 w-72 md:w-80 max-w-screen-lg' onSubmit={handleSubmit(submit)}>
        <div className='flex flex-col gap-4 mb-8'>
          <Input
            size='lg'
            label='Email'
            {...register('email', {
              required: true,
              minLength: 5
            })}
            type='text'
            crossOrigin=''
            className={
              errors.email
                ? 'focus:text-red-200 focus:font-bold focus:bg-[#fdf2f2]  !text-red-200 !font-bold !bg-[#fdf2f2]'
                : 'bg-white'
            }
          />
          <h4 className='text-[red] font-bold'>{errors.email?.message}</h4>
          <div className='relative'>
            <Input
              type={showPassword}
              size='lg'
              label='Password'
              {...register('password', {
                required: true,
                minLength: 8
              })}
              crossOrigin=''
              className={
                errors.password
                  ? 'focus:text-red-200 focus:font-bold focus:bg-[#fdf2f2]  !text-red-200 !font-bold !bg-[#fdf2f2]'
                  : 'bg-white'
              }
            />
            <span
              className={
                errors.password
                  ? 'text-red-500 absolute w-6 right-2 bottom-2'
                  : 'absolute w-6 right-2 bottom-2'
              }
              onClick={() => {
                showPassword === 'password' ? setShowPassword('text') : setShowPassword('password');
              }}
            >
              {showPassword === 'text' ? <EyeIcon className='' /> : <EyeSlashIcon className='' />}
            </span>
          </div>
          <h4 className='text-[red] font-bold'>{errors.password?.message}</h4>
        </div>
        <div className='grid gap-4'>
          <Button size='lg' className='bg-blue-500 capitalize text-base' type='submit'>
            Login
          </Button>
          <Button
            variant='outlined'
            color='blue-gray'
            className='flex items-center gap-3 justify-center'
            onClick={loginByGoogle}
          >
            <img
              src='https://docs.material-tailwind.com/icons/google.svg'
              alt='metamask'
              className='h-6 w-6'
            />
            Log in with Google
          </Button>
        </div>
      </form>
    </Card>
  );
};
