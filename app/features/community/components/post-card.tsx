import { DotIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Card, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';

export interface PostCardProps {
  id: string;
  title: string;
  author: string;
  authorAvatarUrl: string;
  category: string;
  timeAgo: string;
  className?: string;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  timeAgo,
  className,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`}>
      <Card className={`bg-transparent hover:bg-card/50 transition-colors ${className || ''}`}>
        <CardHeader className='flex flex-row gap-2 items-center'>
          <Avatar className='size-14'>
            <AvatarImage src={authorAvatarUrl} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='space-y-2'>
            <CardTitle>{title}</CardTitle>
            <div className='flex gap-2 text-sm leading-tight text-muted-foreground'>
              <span>{author}</span>
              <span>{category}</span>
              <DotIcon className='size-4' />
              <span>{timeAgo}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className='flex justify-end'>
          <div className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
            Reply &rarr;
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
