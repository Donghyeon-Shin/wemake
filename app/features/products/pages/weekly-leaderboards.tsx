import { useParams, type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Weekly Leaderboards | wemake' }];

export default function WeeklyLeaderboardsPage() {
  const { year, month, week } = useParams();
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Weekly Leaderboards</h1>
      <p className='text-muted-foreground'>
        Year: {year} / Month: {month} / Week: {week}
      </p>
    </div>
  );
}
