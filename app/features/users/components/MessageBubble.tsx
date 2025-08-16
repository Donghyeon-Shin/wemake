import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { cn } from '../../../lib/utils';

interface MessageBubbleProps {
  avatarSrc?: string;
  avatarFallback: string;
  content: string;
  isOwnMessage?: boolean;
  timestamp?: string;
}

export function MessageBubble({
  avatarSrc,
  avatarFallback,
  content,
  isOwnMessage = false,
  timestamp,
}: MessageBubbleProps) {
  return (
    <div className={cn('flex items-ends gap-4', isOwnMessage && 'flex-row-reverse')}>
      <Avatar>
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'rounded-md p-4 w-1/4 text-sm',
          isOwnMessage
            ? 'bg-accent rounded-br-none self-end'
            : 'bg-primary/50 text-primary-foreground rounded-bl-none self-start',
        )}
      >
        <p>{content}</p>
        {timestamp && <p className='text-xs text-muted-foreground mt-1'>{timestamp}</p>}
      </div>
    </div>
  );
}
