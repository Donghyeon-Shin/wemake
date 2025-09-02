import { Loader2Icon } from 'lucide-react';
import { Form, Link, redirect, useNavigation } from 'react-router';
import z from 'zod';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import { AuthButtons } from '~/features/auth/components/auth-buttons';
import { makeSSRClient } from '~/supa-client';
import { checkUsernameExists } from '../queries';
import type { Route } from './+types/join';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Join | wemake' }];
};

const FormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data: parsedData, error } = FormSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return {
      signUpError: null,
      formErrors: z.flattenError(error).fieldErrors,
    };
  }
  const { client, headers } = makeSSRClient(request);
  const { name, username, email, password } = parsedData;

  // Check if username exists
  const usernameExists = await checkUsernameExists(client, { username });
  if (usernameExists) {
    return {
      signUpError: null,
      formErrors: { username: ['Username already exists'] },
    };
  }

  // Sign Up
  const { error: signUpError } = await client.auth.signUp({
    email,
    password,
    options: {
      //Supabase raw_user_meta_data에 저장될 데이터
      data: {
        // Custom data for user (Trigger을 통해 profile Table에 저장될 데이터)
        name,
        username,
      },
    },
  });

  if (signUpError) {
    return {
      signUpError: signUpError.message,
      formErrors: null,
    };
  }
  return redirect('/', { headers });
};

export default function Join({ actionData }: Route.ComponentProps) {
  const navigate = useNavigation();
  const isSubmitted = navigate.state === 'submitting' || navigate.state === 'loading';
  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <Button variant='ghost' asChild className='absolute top-8 right-8'>
        <Link to='/auth/login'>Login</Link>
      </Button>
      <div className='flex flex-col items-center justify-center gap-10 w-full max-w-md'>
        <h1 className='text-2xl font-semibold'>Create an account</h1>
        <Form className='w-full space-y-4' method='post'>
          <InputPair
            label='Name'
            description='Enter your name'
            name='name'
            type='text'
            id='name'
            required
            placeholder='Enter your name'
          />
          {actionData && 'formErrors' in actionData && (
            <p className='text-sm text-red-500'>{actionData.formErrors?.name?.join(', ')}</p>
          )}
          <InputPair
            label='Username'
            description='Enter your username'
            name='username'
            type='text'
            id='username'
            required
            placeholder='i.e wemake'
          />
          {actionData && 'formErrors' in actionData && (
            <p className='text-sm text-red-500'>{actionData.formErrors?.username?.join(', ')}</p>
          )}
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
          <Button type='submit' className='w-full'>
            {isSubmitted ? <Loader2Icon className='animate-spin' /> : 'Create account'}
          </Button>
          {actionData && 'signUpError' in actionData && (
            <p className='text-sm text-red-500'>{actionData.signUpError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
