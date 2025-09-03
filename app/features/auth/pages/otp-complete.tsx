import { Loader2Icon } from 'lucide-react';
import { Form, redirect, useNavigation, useSearchParams } from 'react-router';
import z from 'zod';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/otp-complete';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Verify OTP | wemake' }];
};

const FormSchema = z.object({
  email: z.email('Invalid email format'),
  otp: z.string('Invalid OTP format').min(6).max(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data: parsedData, error } = FormSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      fieldErrors: z.flattenError(error).fieldErrors,
      verifyError: null,
    };
  }

  const { email, otp } = parsedData;
  const { client, headers } = makeSSRClient(request);
  const { error: verifyError } = await client.auth.verifyOtp({ email, token: otp, type: 'email' });
  if (verifyError) {
    return { fieldErrors: null, verifyError: verifyError.message };
  }
  return redirect('/', { headers });
};

export default function OtpComplete({ actionData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigation();
  const isSubmitted = navigate.state === 'submitting' || navigate.state === 'loading';
  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center justify-center gap-10 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Confirm OTP</h1>
          <p className='text-sm text-muted-foreground'>Enter the 4-digit code sent to your email</p>
        </div>
        <Form className='w-full space-y-4' method='post'>
          <InputPair
            label='Email'
            description='Enter your email'
            defaultValue={email || ''}
            name='email'
            type='email'
            id='email'
            required
            placeholder='i.e wemake@gmail.com'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>{actionData.fieldErrors?.email?.join(', ')}</p>
          )}
          <InputPair
            label='OTP'
            description='Enter the 4-digit code sent to your email'
            name='otp'
            type='text'
            id='otp'
            required
            placeholder='i.e 1234'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>{actionData.fieldErrors?.otp?.join(', ')}</p>
          )}
          <Button type='submit' className='w-full' disabled={isSubmitted}>
            {isSubmitted ? <Loader2Icon className='animate-spin' /> : 'Verify OTP'}
          </Button>
          {actionData && 'verifyError' in actionData && (
            <p className='text-sm text-red-500'>{actionData.verifyError}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
