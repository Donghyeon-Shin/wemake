import { ChevronUpIcon, StarIcon } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';
import { Button, buttonVariants } from '~/common/components/ui/button';
import { cn } from '~/lib/utils';
import type { Route } from './+types/product-layout';

export default function ProductLayout({ params: { productId } }: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <div className='flex justify-between'>
        <div className='flex gap-10'>
          <div className='size-40 rounded-xl shadow-xl bg-primary/50'></div>
          <div>
            <h1 className='text-5xl font-bold'>Product Name</h1>
            <p className='text-2xl font-light'>Product Description</p>
            <div className='mt-5 flex items-center gap-2'>
              <div className='flex gap-2 text-yellow-500'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className='size-4' fill='currentColor' />
                ))}
              </div>
              <span className='text-muted-foreground'>100 reviews</span>
            </div>
          </div>
        </div>
        <div className='flex gap-2.5'>
          <Button variant='secondary' size='lg' className='text-lg h-14 px-10'>
            Visit WebSite
          </Button>
          <Button size='lg' className='text-lg h-14 px-10'>
            <ChevronUpIcon className='size-4' />
            Upvote(100)
          </Button>
        </div>
      </div>
      <div className='flex gap-2.5'>
        <NavLink
          className={({ isActive }) =>
            cn(
              isActive
                ? buttonVariants({ variant: 'default' })
                : buttonVariants({ variant: 'outline' }),
            )
          }
          to={`/products/${productId}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              isActive
                ? buttonVariants({ variant: 'default' })
                : buttonVariants({ variant: 'outline' }),
            )
          }
          to={`/products/${productId}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
