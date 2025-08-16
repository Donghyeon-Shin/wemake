import { EyeIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';
import { cn } from '../../../lib/utils';

interface NotificationCardProps {
  avatarSrc?: string;
  avatarFallback: string;
  userName: string;
  message: string;
  timeAgo: string;
  seen: boolean;
}

export default function NotificationCard({
  avatarSrc,
  avatarFallback,
  userName,
  message,
  timeAgo,
  seen,
}: NotificationCardProps) {
  return (
    <Card className={cn('min-w-[450px]', !seen && 'bg-yellow-500/60')}>
      <CardHeader className='flex flex-row gap-5 items-center'>
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className='text-lg font-semibold'>
            {userName}
            {message && <span>{message}</span>}
          </CardTitle>
          <small className='text-sm text-muted-foreground'>{timeAgo}</small>
        </div>
      </CardHeader>
      <CardFooter className='flex justify-end'>
        <Button variant='outline' size='icon'>
          <EyeIcon className='w-4 h-4' />
        </Button>
      </CardFooter>
    </Card>
  );
}
