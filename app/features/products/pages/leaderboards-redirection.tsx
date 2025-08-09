import { DateTime } from 'luxon';
import { data, redirect } from 'react-router';
import type { Route } from './+types/leaderboards-redirection';

export function loader({ params }: Route.LoaderArgs) {
  const { period } = params;
  let url: string;
  const today = DateTime.now().setZone('Asia/Seoul');
  switch (period) {
    case 'daily':
      url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
      break;
    case 'weekly':
      url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
      break;
    case 'monthly':
      url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
      break;
    case 'yearly':
      url = `/products/leaderboards/yearly/${today.year}`;
      break;
    default:
      return data(null, { status: 400 }); // data : response 형식으로 반환
  }
  return redirect(url);
}
