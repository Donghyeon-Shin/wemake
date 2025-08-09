import { DotIcon, EyeIcon, HeartIcon, LockIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';
import { cn } from '../../../lib/utils';

export interface IdeaCardProps {
  id: string;
  title: string;
  viewsCount: number;
  likesCount: number;
  timeAgo: string;
  claimed: boolean;
  className?: string;
}

export function IdeaCard({
  id,
  title,
  viewsCount,
  likesCount,
  timeAgo,
  claimed,
  className,
}: IdeaCardProps) {
  return (
    <Card className={`bg-transparent hover:bg-card/50 transition-colors ${className || ''}`}>
      <CardHeader>
        <Link to={`/ideas/${id}`}>
          <CardTitle className='text-xl'>
            <span
              className={cn(
                claimed &&
                  'bg-muted-foreground selection:bg-muted-foreground text-muted-foreground',
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className='flex items-center text-sm'>
        <div className='flex items-center gap-1'>
          <EyeIcon className='size-4' />
          <span>{viewsCount}</span>
        </div>
        <DotIcon className='size-4' />
        <span>{timeAgo}</span>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant='outline' className='flex items-center gap-2'>
          <HeartIcon className='size-4' />
          <span>{likesCount}</span>
        </Button>
        {!claimed ? (
          <Button variant='default' asChild>
            <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
          </Button>
        ) : (
          <Button variant='outline' disabled className='cursor-not-allowed'>
            <LockIcon className='size-4' />
            Claimed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
