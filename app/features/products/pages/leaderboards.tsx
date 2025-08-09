import { Link } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { ProductCard } from '~/features/products/components/product-card';
import type { Route } from './+types/leaderboards';

export const meta: Route.MetaFunction = () => [
  { title: 'Leaderboard | wemake' },
  { name: 'description', content: 'Top product leaderboards.' },
];

export default function LeaderboardsPage() {
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
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={index}
            to={`/products/${index}`}
            title={'Product Name'}
            description={'Product Description'}
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
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
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={index}
            to={`/products/${index}`}
            title={'Product Name'}
            description={'Product Description'}
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
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
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={index}
            to={`/products/${index}`}
            title={'Product Name'}
            description={'Product Description'}
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
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
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={index}
            to={`/products/${index}`}
            title={'Product Name'}
            description={'Product Description'}
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center p-0'>
          <Link to='/products/leaderboards/yearly'>Explore all products &rarr;</Link>
        </Button>
      </div>
    </div>
  );
}
