import { Loader2Icon } from 'lucide-react';
import { Form, Link, useNavigation } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import type { Route } from './+types/login';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Login | wemake' }];
};

// Post 요청 시 실행되는 함수( 함수명은 고정이다. )
export const action = async ({ request }: Route.ActionArgs) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  return {
    message: 'Error wrong password',
  };
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
          <InputPair
            label='Password'
            description='Enter your password'
            name='password'
            type='password'
            id='password'
            required
          />
          {actionData?.message && <p className='text-sm text-red-500'>{actionData.message}</p>}
          <Button type='submit' className='w-full' disabled={isSubmitted}>
            {isSubmitted ? <Loader2Icon className='animate-spin' /> : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
