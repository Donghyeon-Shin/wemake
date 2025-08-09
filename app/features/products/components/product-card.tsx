import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';

type ProductCardProps = {
  to: string;
  title: string;
  description: string;
  commentsCount: number;
  viewsCount: number;
  votesCount: number;
  className?: string;
};

export function ProductCard({
  to,
  title,
  description,
  commentsCount,
  viewsCount,
  votesCount,
  className,
}: ProductCardProps) {
  return (
    <Link to={to} className='block'>
      <Card
        className={`flex w-full flex-row items-center justify-between bg-transparent hover:bg-card/50 ${className ?? ''}`}
      >
        <CardHeader className='w-full'>
          <CardTitle className='text-2xl font-semibold leading-none tracking-tight w-full'>
            {title}
          </CardTitle>
          <CardDescription className='text-sm text-muted-foreground'>{description}</CardDescription>
          <div className='flex items-center gap-4 mt-2'>
            <div className='flex items-center gap-px text-xs text-muted-foreground'>
              <MessageCircleIcon className='size-4' />
              <span>{commentsCount}</span>
            </div>
            <div className='flex items-center gap-px text-xs text-muted-foreground'>
              <EyeIcon className='size-4' />
              <span>{viewsCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className='py-0'>
          <Button variant='outline' className='flex flex-col h-14 w-full'>
            <ChevronUpIcon className='size-4 shrink-0' />
            <span>{votesCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
