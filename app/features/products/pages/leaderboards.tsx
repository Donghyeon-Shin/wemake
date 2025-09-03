import { DateTime } from 'luxon';
import { Link } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { ProductCard } from '~/features/products/components/product-card';
import { makeSSRClient } from '~/supa-client';
import { getProductsByDateRange } from '../queries';
import type { Route } from './+types/leaderboards';

export const meta: Route.MetaFunction = () => [
  { title: 'Leaderboard | wemake' },
  { name: 'description', content: 'Top product leaderboards.' },
];

export async function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  // 병렬 처리
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all([
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf('day'),
      endDate: DateTime.now().endOf('day'),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf('week'),
      endDate: DateTime.now().endOf('week'),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf('month'),
      endDate: DateTime.now().endOf('month'),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf('year'),
      endDate: DateTime.now().endOf('year'),
      limit: 7,
    }),
  ]);

  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
}

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <Hero title='Leaderboards' subtitle='The most popular products on wemake.' />
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tighter'>Daily Leaderboard</h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products on wemake by day.
          </p>
        </div>
        {loaderData.dailyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            to={`/products/${product.product_id}`}
            title={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center p-0'>
          <Link to='/products/leaderboards/daily'>Explore all products &rarr;</Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tighter'>Weekly Leaderboard</h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products on wemake by week.
          </p>
        </div>
        {loaderData.weeklyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            to={`/products/${product.product_id}`}
            title={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center p-0'>
          <Link to='/products/leaderboards/weekly'>Explore all products &rarr;</Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tighter'>Monthly Leaderboard</h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products on wemake by month.
          </p>
        </div>
        {loaderData.monthlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            to={`/products/${product.product_id}`}
            title={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center p-0'>
          <Link to='/products/leaderboards/monthly'>Explore all products &rarr;</Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tighter'>Yearly Leaderboard</h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products on wemake by year.
          </p>
        </div>
        {loaderData.yearlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            to={`/products/${product.product_id}`}
            title={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center p-0'>
          <Link to='/products/leaderboards/yearly'>Explore all products &rarr;</Link>
        </Button>
      </div>
    </div>
  );
}
