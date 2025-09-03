import { Loader2Icon } from 'lucide-react';
import { Form, redirect, useNavigation } from 'react-router';
import { z } from 'zod';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/otp-start';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'OTP Start | wemake' }];
};

const FormSchema = z.object({
  email: z.email('Invalid email format'),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data: parsedData } = FormSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      error: 'Invalid email address',
    };
  }
  const { email } = parsedData;
  const { client } = makeSSRClient(request);
  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true, // 새로운 유저도 OTP 로그인을 할 수 있게 할 것인가
    },
  });
  if (error) {
    return { error: 'Failed to send OTP' };
  }
  return redirect(`/auth/otp/complete?email=${email}`);
};

export default function OtpStart({ actionData }: Route.ComponentProps) {
  const navigate = useNavigation();
  const isSubmitted = navigate.state === 'submitting' || navigate.state === 'loading';
  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center justify-center gap-10 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Login with OTP</h1>
          <p className='text-sm text-muted-foreground'>
            We will send you a 4-digit code to log in to your account
          </p>
        </div>
        <Form className='w-full space-y-4' method='post'>
          <InputPair
            label='Email'
            description='Enter your email'
            name='email'
            type='email'
            id='email'
            required
            placeholder='i.e wemake@gmail.com'
          />
          {actionData && 'error' in actionData && (
            <p className='text-sm text-red-500'>{actionData.error}</p>
          )}
          <Button type='submit' className='w-full' disabled={isSubmitted}>
            {isSubmitted ? <Loader2Icon className='animate-spin' /> : 'Send OTP'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
