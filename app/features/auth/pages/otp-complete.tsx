import { Form } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import type { Route } from './+types/otp-complete';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Verify OTP | wemake' }];
};

export default function OtpComplete() {
  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center justify-center gap-10 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Confirm OTP</h1>
          <p className='text-sm text-muted-foreground'>Enter the 4-digit code sent to your email</p>
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
          <InputPair
            label='OTP'
            description='Enter the 4-digit code sent to your email'
            name='otp'
            type='text'
            id='otp'
            required
            placeholder='i.e 1234'
          />
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
