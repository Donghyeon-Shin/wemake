import { Form } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import type { Route } from './+types/otp-start';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'OTP Start | wemake' }];
};

export default function OtpStart() {
  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center justify-center gap-10 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Login with OTP</h1>
          <p className='text-sm text-muted-foreground'>
            We will send you a 4-digit code to log in to your account
          </p>
        </div>
        <Form className='w-full space-y-4'>
          <InputPair
            label='Email'
            description='Enter your email'
            name='email'
            type='email'
            id='email'
            required
            placeholder='i.e wemake@gmail.com'
          />
          <Button type='submit' className='w-full'>
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}
