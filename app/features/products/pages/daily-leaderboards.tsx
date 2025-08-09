import { DateTime } from 'luxon';
import { data, isRouteErrorResponse, Link, type MetaFunction } from 'react-router';
import { z } from 'zod';
import { Hero } from '../../../common/components/layout/hero';
import ProductPagination from '../../../common/components/layout/product-pagination';
import { Button } from '../../../common/components/ui/button';
import { ProductCard } from '../components/product-card';
import type { Route } from './+types/daily-leaderboards';

export const meta: MetaFunction = () => [{ title: 'Daily Leaderboards | wemake' }];

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 });
  }
  const date = DateTime.fromObject(parsedData);
  if (!date.isValid) {
    throw data({ error_code: 'invalid_date', message: 'Invalid date' }, { status: 400 });
  }
  const today = DateTime.now().startOf('day');
  if (date > today) {
    throw data({ error_code: 'future_date', message: 'Future date' }, { status: 400 });
  }
  return { ...parsedData };
};

export default function DailyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day,
  });
  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf('day'));
  return (
    <div className='p-8 space-y-10'>
      <Hero title={`The best products of ${urlDate.toLocaleString(DateTime.DATE_MED)}`} />
      <div className='flex items-center justify-center gap-2'>
        <Button variant='secondary' asChild>
          <Link
            to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}
          >
            &larr; {previousDay.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant='secondary' asChild>
            <Link
              to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
            >
              {nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
      <div className='space-y-5 w-full max-w-screen-md mx-auto'>
        {Array.from({ length: 11 }).map((_, index) => (
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
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}

// 가장 가까운 ErrorBoundary 컴포넌트에서 처리(끝은 root.tsx에 있음)
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // 4xx, 5xx 에러 처리
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  // Catch all errors
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown error</div>;
}
