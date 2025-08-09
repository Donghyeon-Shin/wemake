import { DateTime } from 'luxon';
import { data, isRouteErrorResponse, useParams, type MetaFunction } from 'react-router';
import type { Route } from './+types/daily-leaderboards';

export const meta: MetaFunction = () => [{ title: 'Daily Leaderboards | wemake' }];

export const loader = ({ params }: Route.LoaderArgs) => {
  const { year, month, day } = params;
  const date = DateTime.fromObject({ year: Number(year), month: Number(month), day: Number(day) });
  if (!date.isValid) {
    throw data({ error_code: 'invalid_date', message: 'Invalid date' }, { status: 400 });
  }
  const today = DateTime.now().setZone('Asia/Seoul').startOf('day');
  if (date > today) {
    throw data({ error_code: 'future_date', message: 'Future date' }, { status: 400 });
  }
  const products = await getProductsByDate(date);
  return { date };
};

export default function DailyLeaderboardsPage() {
  const { year, month, day } = useParams();
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Daily Leaderboards</h1>
      <p className='text-muted-foreground'>
        {year}-{month}-{day}
      </p>
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
