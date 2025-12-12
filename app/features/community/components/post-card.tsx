import { ChevronUpIcon, DotIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { Link, useFetcher } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';
import { cn } from '~/lib/utils';

export interface PostCardProps {
  id: number;
  title: string;
  author: string;
  authorAvatarUrl: string | null;
  category: string;
  postedAt: string;
  className?: string;
  expanded?: boolean;
  votesCount?: number;
  isUpvoted?: boolean;
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
  isUpvoted = false,
}: PostCardProps) {
  const fetcher = useFetcher();
  // optimistic update
  const optimisticVotesCount =
    fetcher.state === 'idle' ? votesCount : isUpvoted ? votesCount - 1 : votesCount + 1;
  const optimisticIsUpvoted = fetcher.state === 'idle' ? isUpvoted : !isUpvoted;
  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetcher.submit(null, { method: 'post', action: `/community/${id}/upvote` });
  };
  return (
    <Link to={`/community/${id}`} className='block'>
      <Card
        className={cn(
          'bg-transparent hover:bg-card/50 transition-colors',
          expanded && 'flex flex-row items-center justify-between',
          className,
        )}
      >
        <CardHeader className='flex flex-row gap-2 items-center w-full'>
          <Avatar className='size-14'>
            {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='space-y-2'>
            <CardTitle>{title}</CardTitle>
            <div className='flex gap-2 text-sm leading-tight text-muted-foreground'>
              <span>{author}</span>
              <span>{category}</span>
              <DotIcon className='size-4' />
              <span>{DateTime.fromISO(postedAt).toRelative()}</span>
            </div>
          </div>
        </CardHeader>

        {!expanded && (
          <CardFooter className='flex justify-end'>
            <Button variant='link'>Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className='flex justify-end  pb-0'>
            <Button
              onClick={absorbClick}
              variant='outline'
              className={cn(
                'flex flex-col h-14',
                optimisticIsUpvoted ? 'border-primary text-primary' : '',
              )}
            >
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>{optimisticVotesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
