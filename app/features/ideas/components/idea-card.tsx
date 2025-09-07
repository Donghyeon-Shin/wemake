import { DotIcon, EyeIcon, HeartIcon, LockIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';
import { cn } from '../../../lib/utils';

export interface IdeaCardProps {
  id: number;
  title: string;
  viewsCount?: number;
  likesCount?: number;
  postedAt?: string;
  owner?: boolean;
  claimed?: boolean;
  className?: string;
}

export function IdeaCard({
  id,
  title,
  viewsCount,
  likesCount,
  postedAt,
  owner,
  claimed,
  className,
}: IdeaCardProps) {
  return (
    <Card className={`bg-transparent hover:bg-card/50 transition-colors ${className || ''}`}>
      <CardHeader>
        <Link to={claimed || owner ? '' : `/ideas/${id}`}>
          <CardTitle className='text-xl'>
            <span
              className={cn(
                claimed &&
                  'bg-muted-foreground selection:bg-muted-foreground text-muted-foreground break-all', // break-all 추가하여 텍스트가 자신의 콘텐츠 밖으로 나가지 않게 함
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      {!owner && (
        <CardContent className='flex items-center text-sm'>
          <div className='flex items-center gap-1'>
            <EyeIcon className='size-4' />
            <span>{viewsCount}</span>
          </div>
          <DotIcon className='size-4' />
          <span>{postedAt}</span>
        </CardContent>
      )}
      <CardFooter className='flex justify-end gap-2'>
        {!claimed && !owner ? (
          <>
            <Button variant='outline' className='flex items-center gap-2'>
              <HeartIcon className='size-4' />
              <span>{likesCount}</span>
            </Button>
            <Button variant='default' asChild>
              <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
            </Button>
          </>
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
