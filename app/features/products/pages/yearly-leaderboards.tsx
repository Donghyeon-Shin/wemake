import { DateTime } from 'luxon';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/layout/hero';
import ProductPagination from '~/common/components/layout/product-pagination';
import { Button } from '~/common/components/ui/button';
import { ProductCard } from '~/features/products/components/product-card';
import { getProductPagesByDateRange, getProductsByDateRange } from '../queries';
import type { Route } from './+types/yearly-leaderboards';

const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
  })
    .setZone('Asia/Seoul')
    .setLocale('ko');
  return [
    {
      title: `The best of ${date.toLocaleString({
        year: 'numeric',
      })} | wemake`,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 });
  }
  const date = DateTime.fromObject({
    year: parsedData.year,
  });

  if (!date.isValid) {
    throw data({ error_code: 'invalid_date', message: 'Invalid date' }, { status: 400 });
  }
  const today = DateTime.now().startOf('year');
  if (date > today) {
    throw data({ error_code: 'future_date', message: 'Future date' }, { status: 400 });
  }
  const url = new URL(request.url);
  const products = await getProductsByDateRange({
    startDate: date.startOf('year'),
    endDate: date.endOf('year'),
    page: Number(url.searchParams.get('page')) || 1,
    limit: 15,
  });
  const totalPages = await getProductPagesByDateRange({
    startDate: date.startOf('year'),
    endDate: date.endOf('year'),
  });
  return { ...parsedData, products, totalPages };
};

export default function YearlyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });
  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf('year'));
  return (
    <div className='p-8 space-y-10'>
      <Hero title={`The best of ${urlDate.toLocaleString({ year: 'numeric' })}`} />
      <div className='flex items-center justify-center gap-2'>
        <Button variant='secondary' asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr;{' '}
            {previousYear.toLocaleString({
              year: 'numeric',
            })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant='secondary' asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({
                year: 'numeric',
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
