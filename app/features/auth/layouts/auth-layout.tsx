import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-screen'>
      <div className='bg-gradient-to-br from-primary via-black to-primary/50 hidden lg:block' />
      <Outlet />
    </div>
  );
}
