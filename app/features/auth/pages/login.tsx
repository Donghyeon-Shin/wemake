import { Form, Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';

export default function Login() {
  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <Button variant='ghost' asChild className='absolute top-8 right-8'>
        <Link to='/auth/join'>Join</Link>
      </Button>
      <div className='flex flex-col items-center justify-center gap-10 w-full max-w-md'>
        <h1 className='text-2xl font-semibold'>Login to your account</h1>
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
            label='Password'
            description='Enter your password'
            name='password'
            type='password'
            id='password'
            required
          />
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
