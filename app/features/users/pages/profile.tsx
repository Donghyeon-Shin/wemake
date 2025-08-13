import type { Route } from './+types/profile';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Profile | wemake' }, { name: 'description', content: 'Profile' }];
};

export default function Profile() {
  return (
    <div className='max-w-screen-md flex flex-col gap-10'>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>Headline</h4>
        <p className='text-muted-foreground'>
          I'm product designer based in San Francisco, I like to build products that help people
        </p>
      </div>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>About</h4>
        <p className='text-muted-foreground'>
          I'm product designer based in San Francisco, I like to build products that help people
        </p>
      </div>
    </div>
  );
}
