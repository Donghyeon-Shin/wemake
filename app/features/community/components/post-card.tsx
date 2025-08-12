import { ChevronUpIcon, DotIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';
import { cn } from '../../../lib/utils';

export interface PostCardProps {
  id: string;
  title: string;
  author: string;
  authorAvatarUrl: string;
  category: string;
  postedAt: string;
  className?: string;
  expanded?: boolean;
  votesCount?: number;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  postedAt,
  className,
  expanded = false,
  votesCount = 0,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`} className='block'>
      <Card
        className={cn(
          'bg-transparent hover:bg-card/50 transition-colors',
          expanded && 'flex flex-row items-center justify-between',
          className,
        )}
      >
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
              <span className='w-[100px]'>{postedAt}</span>
            </div>
          </div>
        </CardHeader>

        <CardFooter className='flex justify-end'>
          {!expanded ? (
            <div className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
              Reply &rarr;
            </div>
          ) : (
            <Button variant='outline' className='flex flex-col h-14 pt-0 pb-0'>
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>{votesCount}</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
