import { data, Outlet } from 'react-router';
import { z } from 'zod';
import type { Route } from './+types/leaderboards-layout';

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success: searchParamsSuccess, data: searchParamsData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!searchParamsSuccess) {
    throw data({ error_code: 'invalid_page', message: 'Invalid page' }, { status: 400 });
  }
};
export default function LeaderboardsLayout() {
  return <Outlet />;
}
