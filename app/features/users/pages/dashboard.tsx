import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '~/common/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/common/components/ui/chart';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId } from '../queries';
import type { Route } from './+types/dashboard';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Dashboard | wemake' }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { data: stats, error } = await client.rpc('get_dashboard_stats', { user_id: userId });
  if (error) throw new Error(error.message);
  return { chartData: stats };
};
const chartConfig = {
  views: {
    label: '👀',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-semibold mb-6'>Dashboard</h1>
      <Card className='w-1/2'>
        <CardHeader>
          <CardTitle>Profile views</CardTitle>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={loaderData.chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  padding={{ left: 12, right: 12 }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line
                  dataKey='views'
                  type='natural'
                  stroke='var(--color-views)'
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
