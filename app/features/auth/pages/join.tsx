import { Form, Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import { AuthButtons } from '~/features/auth/components/auth-buttons';
import type { Route } from './+types/join';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Join | wemake' }];
};

export default function Join() {
  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <Button variant='ghost' asChild className='absolute top-8 right-8'>
        <Link to='/auth/login'>Login</Link>
      </Button>
      <div className='flex flex-col items-center justify-center gap-10 w-full max-w-md'>
        <h1 className='text-2xl font-semibold'>Create an account</h1>
        <Form className='w-full space-y-4'>
          <InputPair
            label='Name'
            description='Enter your name'
            name='name'
            type='text'
            id='name'
            required
            placeholder='Enter your name'
          />
          <InputPair
            label='Username'
            description='Enter your username'
            name='username'
            type='text'
            id='username'
            required
            placeholder='i.e wemake'
          />
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
          <Button type='submit' className='w-full'>
            Create account
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
