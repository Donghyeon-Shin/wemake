import { formatDistanceToNow } from 'date-fns';
import { makeSSRClient } from '~/supa-client';
import NotificationCard from '../components/NotificationCard';
import { getLoggedInUserId, getNotifications } from '../queries';
import type { Route } from './+types/notifications';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Notifications | wemake' },
    { name: 'description', content: 'Manage your notifications' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const notifications = await getNotifications(client, { userId });
  return { notifications };
};

export default function Notifications({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <h1 className='text-4xl font-bold mb-6'>Notifications</h1>
      <div className='flex flex-col items-start gap-5'>
        {loaderData.notifications.map((notification) => (
          <NotificationCard
            id={notification.notification_id}
            key={notification.notification_id}
            avatarSrc={notification.source?.avatar ?? ''}
            avatarFallback={notification.source?.name?.[0] ?? ''}
            userName={notification.source?.name ?? ''}
            type={notification.type}
            timeAgo={formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
            seen={notification.seen}
            productName={notification.product?.name ?? ''}
            postTitle={notification.community_post?.title ?? ''}
            payloadId={
              notification.product?.product_id ?? notification.community_post?.post_id ?? null
            }
          />
        ))}
      </div>
    </div>
  );
}
