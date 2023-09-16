import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { authService } from '@services';
import { useUserStore } from '@states';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { validateSchema } from '@utils';
import { yupResolver } from '@hookform/resolvers/yup';

export function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(validateSchema)
  });
  const [showPassword, setShowPassword] = useState<string>('password');
  const { getUserData } = useUserStore();

  const submit = (data: LoginFormData) => {
    authService
      .login(data)
      .then(() => {
        getUserData();
      })
      .catch((err) => {
        toast.error(err.message);
      });
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
        <div className='mb-16 flex flex-col gap-6'>
          <Input
            size='lg'
            label='Username'
            {...register('username', {
              required: true,
              minLength: 5
            })}
            type='text'
            crossOrigin=''
            className={
              errors.username
                ? 'focus:text-red-200 focus:font-bold focus:bg-[#fdf2f2]  !text-red-200 !font-bold !bg-[#fdf2f2]'
                : 'bg-white'
            }
          />
          <h4 className='text-[red] font-bold'>{errors.username?.message}</h4>
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

        <Button className='mt-6 bg-blue-500' fullWidth type='submit'>
          Login
        </Button>
      </form>
    </Card>
  );
}
