import { AvatarFallback } from '@radix-ui/react-avatar';
import { StarIcon } from 'lucide-react';
import { Avatar, AvatarImage } from '~/common/components/ui/avatar';

interface ReviewCardProps {
  name: string;
  username: string;
  avatar?: string;
  rating: number;
  content: string;
  postedAt: string;
}

export function ReviewCard({ name, username, avatar, rating, content, postedAt }: ReviewCardProps) {
  return (
    <div className='space-y-5'>
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className='text-lg font-bold'>{name}</h2>
          <p className='text-sm text-muted-foreground'>@{username}</p>
        </div>
      </div>
      <div className='flex gap-2 text-yellow-500'>
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className='size-4'
            fill={index < rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <p className='text-muted-foreground'>{content}</p>
      <span className='text-sm text-muted-foreground'>{postedAt}</span>
    </div>
  );
}
