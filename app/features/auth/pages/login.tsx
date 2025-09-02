import { Loader2Icon } from 'lucide-react';
import { Form, Link, redirect, useNavigation } from 'react-router';
import { z } from 'zod';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/login';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Login | wemake' }];
};

const FormSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),
  password: z.string('Password is required').min(8, 'Password must be at least 8 characters'),
});

// Post 요청 시 실행되는 함수( 함수명은 고정이다. )
export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data: parsedData, error } = FormSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return {
      loginError: null,
      formErrors: z.flattenError(error).fieldErrors,
    };
  }

  const { email, password } = parsedData;
  const { client, headers } = makeSSRClient(request);

  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    return { loginError: loginError.message, formErrors: null };
  }

  // 로그인 성공 시 홈으로 리다이렉트(해더에 쿠키 정보 포함)
  return redirect('/', { headers });
};

export default function Login({ actionData }: Route.ComponentProps) {
  const navigate = useNavigation();
  const isSubmitted = navigate.state === 'submitting';

  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <Button variant='ghost' asChild className='absolute top-8 right-8'>
        <Link to='/auth/join'>Join</Link>
      </Button>
      <div className='flex flex-col items-center justify-center gap-10 w-full max-w-md'>
        <h1 className='text-2xl font-semibold'>Login to your account</h1>
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
          {actionData && 'formErrors' in actionData && (
            <p className='text-sm text-red-500'>{actionData.formErrors?.email?.join(', ')}</p>
          )}
          <InputPair
            label='Password'
            description='Enter your password'
            name='password'
            type='password'
            id='password'
            required
          />
          {actionData && 'formErrors' in actionData && (
            <p className='text-sm text-red-500'>{actionData.formErrors?.password?.join(', ')}</p>
          )}

          <Button type='submit' className='w-full' disabled={isSubmitted}>
            {isSubmitted ? <Loader2Icon className='animate-spin' /> : 'Login'}
          </Button>
          {actionData && 'loginError' in actionData && (
            <p className='text-sm text-red-500'>{actionData.loginError}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
