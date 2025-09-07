import { redirect } from 'react-router';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '~/common/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/common/components/ui/chart';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId } from '../queries';
import type { Route } from './+types/dashboard-product';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Dashboard Product | wemake' }];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { error: productError } = await client
    .from('products')
    .select('product_id')
    .eq('profile_id', userId)
    .eq('product_id', Number(params.productId))
    .single();

  if (productError) throw redirect('/my/dashboard/products'); // user가 생성한 제품으로 접근했을 때

  const { data: stats, error: rpcError } = await client.rpc('get_product_stats', {
    product_id: params.productId,
  });
  if (rpcError) throw new Error(rpcError.message);
  return { chartData: stats };
};

const chartConfig = {
  views: {
    label: 'Page views',
    color: 'var(--chart-1)',
  },
  visitors: {
    label: 'Visitors',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export default function DashboardProduct({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-semibold mb-6'>Analytics</h1>
      <Card className='w-1/2'>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                  wrapperStyle={{ minWidth: '200px' }}
                />
                <Area
                  dataKey='product_views'
                  fill='var(--color-views)'
                  fillOpacity={0.3}
                  stroke='var(--color-views)'
                />
                <Area
                  dataKey='product_visit'
                  fill='var(--color-visitors)'
                  fillOpacity={0.3}
                  stroke='var(--color-visitors)'
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
