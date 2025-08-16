import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '~/common/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/common/components/ui/chart';
import type { Route } from './+types/dashboard';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Dashboard | wemake' }];
};

const chartData = [
  { month: 'January', views: 186 },
  { month: 'February', views: 305 },
  { month: 'March', views: 237 },
  { month: 'April', views: 73 },
  { month: 'May', views: 209 },
  { month: 'June', views: 214 },
];
const chartConfig = {
  views: {
    label: '👀',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export default function Dashboard() {
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
                data={chartData}
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
                  tickFormatter={(value) => value.slice(0, 3)}
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
