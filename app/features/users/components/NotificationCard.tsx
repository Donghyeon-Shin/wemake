import { EyeIcon } from 'lucide-react';
import { Link, useFetcher } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';
import { cn } from '../../../lib/utils';

interface NotificationCardProps {
  id: number;
  avatarSrc?: string;
  avatarFallback: string;
  userName: string;
  type: 'follow' | 'review' | 'reply' | 'mention';
  timeAgo: string;
  seen: boolean;
  productName?: string;
  postTitle?: string;
  payloadId?: number | null;
}

export default function NotificationCard({
  id,
  avatarSrc,
  avatarFallback,
  userName,
  type,
  timeAgo,
  seen,
  productName,
  postTitle,
  payloadId,
}: NotificationCardProps) {
  const fetcher = useFetcher();
  const optimisticSeen = fetcher.state === 'idle' ? seen : !seen;
  const getMessage = () => {
    switch (type) {
      case 'follow':
        return ' followed you.';
      case 'review':
        return ' reviewed your product : ';
      case 'reply':
        return ' replied to your post : ';
      case 'mention':
        return ' mentioned you.';
    }
  };

  return (
    <Card className={cn('min-w-[450px]', !seen && 'bg-yellow-500/60')}>
      <CardHeader className='flex flex-row gap-5 items-center'>
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className='text-lg font-semibold'>
            <span>{userName}</span>
            <span>{getMessage()}</span>
            {productName && (
              <Button variant='ghost' asChild className='text-lg'>
                <Link to={`/products/${payloadId}`}>{productName}</Link>
              </Button>
            )}
            {postTitle && (
              <Button variant='ghost' asChild className='text-lg'>
                <Link to={`/community/${payloadId}`}>{postTitle}</Link>
              </Button>
            )}
          </CardTitle>
          <small className='text-sm text-muted-foreground'>{timeAgo}</small>
        </div>
      </CardHeader>
      <CardFooter className='flex justify-end'>
        {optimisticSeen ? null : (
          <fetcher.Form method='post' action={`/my/notifications/${id}/see`}>
            <Button variant='outline' size='icon'>
              <EyeIcon className='w-4 h-4' />
            </Button>
          </fetcher.Form>
        )}
      </CardFooter>
    </Card>
  );
}
