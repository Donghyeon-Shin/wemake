import { useParams, type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Daily Leaderboards | wemake' }];

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
