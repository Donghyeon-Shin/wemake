import { ChevronUpIcon, StarIcon } from 'lucide-react';
import { data, NavLink, Outlet } from 'react-router';
import { z } from 'zod';
import { Button, buttonVariants } from '~/common/components/ui/button';
import { cn } from '~/lib/utils';
import { getProductById } from '../queries';
import type { Route } from './+types/product-layout';

export const meta: Route.MetaFunction = ({ loaderData }: Route.MetaArgs) => {
  if (!loaderData) return [];
  return [
    { title: `${loaderData.product.name} Overview | wemake` },
    { name: 'description', content: loaderData.product.tagline },
  ];
};

const paramsSchema = z.object({
  productId: z.coerce.number(),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 });
  }
  const productId = parsedData.productId;
  const product = await getProductById({ productId });
  return { product };
};

export default function ProductLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <div className='flex justify-between'>
        <div className='flex gap-10'>
          <div className='size-40 rounded-xl shadow-xl bg-primary/50'></div>
          <div>
            <h1 className='text-5xl font-bold'>{loaderData.product.name}</h1>
            <p className='text-2xl font-light'>{loaderData.product.description}</p>
            <div className='mt-5 flex items-center gap-2'>
              <div className='flex gap-2 text-yellow-500'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className='size-4'
                    fill={
                      index < Math.floor(loaderData.product.average_rating)
                        ? 'currentColor'
                        : 'none'
                    }
                  />
                ))}
              </div>
              <span className='text-muted-foreground'>{loaderData.product.reviews} reviews</span>
            </div>
          </div>
        </div>
        <div className='flex gap-2.5'>
          <Button variant='secondary' size='lg' className='text-lg h-14 px-10'>
            Visit WebSite
          </Button>
          <Button size='lg' className='text-lg h-14 px-10'>
            <ChevronUpIcon className='size-4' />
            Upvote({loaderData.product.upvotes})
          </Button>
        </div>
      </div>
      <div className='flex gap-2.5'>
        <NavLink
          end
          className={({ isActive }) =>
            cn(
              isActive
                ? buttonVariants({ variant: 'default' })
                : buttonVariants({ variant: 'outline' }),
            )
          }
          to={`/products/${loaderData.product.product_id}/overview`}
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
          to={`/products/${loaderData.product.product_id}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet
          context={{
            product_id: loaderData.product.product_id,
            description: loaderData.product.description,
            how_it_works: loaderData.product.how_it_works,
            review_count: loaderData.product.reviews,
          }}
        />
      </div>
    </div>
  );
}
