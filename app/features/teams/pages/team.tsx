import { DateTime } from 'luxon';
import { data, Form } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/layout/hero';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Badge } from '~/common/components/ui/badge';
import { Button } from '~/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/common/components/ui/card';
import { InputPair } from '~/common/components/ui/input-pair';
import { makeSSRClient } from '~/supa-client';
import { getTeamById } from '../queries';
import type { Route } from './+types/team';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Team | wemake' }];
};

const paramsSchema = z.object({
  teamId: z.coerce.number(),
});

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 });
  }
  const team = await getTeamById(client, { teamId: parsedData.teamId });
  return { team };
};

export default function Team({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <Hero title={`Join ${loaderData.team.team_leader.name}'s team`} />
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 grid grid-cols-4 gap-5'>
          {[
            {
              title: 'Product name',
              value: loaderData.team.product_name,
            },
            {
              title: 'Stage',
              value: loaderData.team.product_stage,
            },
            {
              title: 'Team size',
              value: loaderData.team.team_size,
            },
            {
              title: 'Available equity',
              value: loaderData.team.equity_split,
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {item.title}
                </CardTitle>
                <CardContent className='p-o font-bold text-2xl capitalize'>
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Looking for
              </CardTitle>
              <CardContent className='p-o font-bold text-2xl'>
                <ul className='text-lg list-disc list-inside'>
                  {loaderData.team.roles.split(',').map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Idea description
              </CardTitle>
              <CardContent className='p-o font-medium text-xl'>
                <p>{loaderData.team.product_description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className='col-span-2 space-y-5 p-6 border rounded-lg shadow-sm'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              {loaderData.team.team_leader.avatar && (
                <AvatarImage src={loaderData.team.team_leader.avatar} />
              )}
              <AvatarFallback>
                {loaderData.team.team_leader.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <h4 className='text-lg font-bold'>{loaderData.team.team_leader.name}</h4>
              <Badge variant='secondary' className='capitalize'>
                {loaderData.team.team_leader.role}
              </Badge>
            </div>
          </div>
          <div className='text-sm flex flex-col gap-2'>
            <span>🎂 Joined {DateTime.fromISO(loaderData.team.created_at).toRelative()}</span>
            <span>🚀 Launched {loaderData.team.team_size} products</span>
          </div>
          <Form
            className='space-y-5'
            method='post'
            action={`/users/${loaderData.team.team_leader.username}/messages`}
          >
            <InputPair
              label='Introduce yourself'
              description='Tell us about yourself'
              name='content'
              id='introduction'
              textarea
              placeholder='i.e I am a React Developer with 3 years of experience'
              required
            />
            <Button type='submit' className='w-full'>
              Get in touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
