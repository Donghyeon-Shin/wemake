import NotificationCard from '../components/NotificationCard';
import type { Route } from './+types/notifications';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Notifications | wemake' },
    { name: 'description', content: 'Manage your notifications' },
  ];
};

export default function Notifications() {
  return (
    <div className='space-y-20'>
      <h1 className='text-4xl font-bold mb-6'>Notifications</h1>
      <div className='flex flex-col items-start gap-5'>
        <NotificationCard
          avatarSrc='https://github.com/shadcn.png'
          avatarFallback='CN'
          userName='Steve Jobs'
          message='followed you.'
          timeAgo='2 days ago'
          seen={false}
        />
      </div>
    </div>
  );
}
