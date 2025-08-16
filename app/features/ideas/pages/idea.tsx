import { DotIcon, EyeIcon, HeartIcon } from 'lucide-react';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/idea';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Idea | wemake' }];
};

export default function Idea() {
  return (
    <div>
      <Hero title='Idea #id' subtitle='Find ideas for your next project' />
      <div className='max-w-screen-sm mx-auto flex flex-col items-center gap-10'>
        <p className='italic'>
          "A startup that creates an AI-powered generated personal trainer, delivering customized
          fitness recommendations. and tracking of progress using a mobile app to track workouts and
          progress as well as a webiste to manage the business."
        </p>
        <div className='flex items-center text-sm'>
          <div className='flex items-center gap-1'>
            <EyeIcon className='size-4' />
            <span>123</span>
          </div>
          <DotIcon className='size-4' />
          <span>12 hours ago</span>
          <DotIcon className='size-4' />
          <Button variant='outline' className='flex items-center gap-2'>
            <HeartIcon className='size-4' />
            <span>12</span>
          </Button>
        </div>
        <Button size='lg'>Claimed idea now &rarr;</Button>
      </div>
    </div>
  );
}
