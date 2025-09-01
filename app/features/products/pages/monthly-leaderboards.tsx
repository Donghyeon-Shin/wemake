import { DateTime } from 'luxon';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/layout/hero';
import ProductPagination from '~/common/components/layout/product-pagination';
import { Button } from '~/common/components/ui/button';
import { ProductCard } from '~/features/products/components/product-card';
import { makeSSRClient } from '~/supa-client';
import { getProductPagesByDateRange, getProductsByDateRange } from '../queries';
import type { Route } from './+types/monthly-leaderboards';

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
  })
    .setZone('Asia/Seoul')
    .setLocale('ko');
  return [
    {
      title: `The best of ${date.toLocaleString({
        year: '2-digit',
        month: 'long',
      })} | wemake`,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 });
  }
  const date = DateTime.fromObject({
    year: parsedData.year,
    month: parsedData.month,
  });
  if (!date.isValid) {
    throw data({ error_code: 'invalid_date', message: 'Invalid date' }, { status: 400 });
  }
  const today = DateTime.now().startOf('month');
  if (date > today) {
    throw data({ error_code: 'future_date', message: 'Future date' }, { status: 400 });
  }

  const url = new URL(request.url);

  const products = await getProductsByDateRange(client, {
    startDate: date.startOf('month'),
    endDate: date.endOf('month'),
    page: Number(url.searchParams.get('page')) || 1,
    limit: 15,
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf('month'),
    endDate: date.endOf('month'),
  });
  return { ...parsedData, products, totalPages };
};

export default function MonthlyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
  });
  const previousMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf('month'));
  return (
    <div className='p-8 space-y-10'>
      <Hero
        title={`The best of ${urlDate.toLocaleString({
          year: '2-digit',
          month: 'long',
        })}`}
      />
      <div className='flex items-center justify-center gap-2'>
        <Button variant='secondary' asChild>
          <Link to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}>
            &larr;{' '}
            {previousMonth.toLocaleString({
              year: '2-digit',
              month: 'long',
            })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant='secondary' asChild>
            <Link to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}>
              {nextMonth.toLocaleString({
                year: '2-digit',
                month: 'long',
              })}
              &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
      <div className='space-y-5 w-full max-w-screen-md mx-auto'>
        {loaderData.products.map((product) => (
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
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
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
