import { MessageCircleIcon } from 'lucide-react';
import type { Route } from './+types/messages';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Messages | wemake' }];
};

export default function Messages() {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-4'>
      <MessageCircleIcon className='size-12 text-muted-foreground' />
      <h1 className='text-2xl font-semibold text-muted-foreground'>
        Click on a message in the sidebar to view it.
      </h1>
    </div>
  );
}
