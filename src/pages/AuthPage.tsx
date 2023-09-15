import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { authService } from '@services';
import { useUserStore } from '@states';

export function AuthPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();

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
      <Typography className="text-[#030391] font-bold text-3xl leading-normal lg:mt-10">
        Welcome!
      </Typography>
      <Typography className="text-[#1488D8] text-base font-normal">
        Student Smart Printing Service (SSPS)
      </Typography>
      <form className='mt-20 mb-2 w-72 md:w-80 max-w-screen-lg' onSubmit={handleSubmit(submit)}>
        <div className='mb-16 flex flex-col gap-6'>
          <Input
            id='auth-email'
            size='lg'
            label='Username'
            {...register('email', {
              required: true,
              minLength: 5
            })}
            type='email'
            crossOrigin=''
            className='bg-white'
          />
          <Input
            id='auth-password'
            type='password'
            size='lg'
            label='Password'
            {...register('password', {
              required: true,
              minLength: 8
            })}
            crossOrigin=''
            className='bg-white'
          />
        </div>

        <Button className='mt-6 bg-blue-500' fullWidth type='submit'>
          Login
        </Button>
      </form>
    </Card>
  );
}
