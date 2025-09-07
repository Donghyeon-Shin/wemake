import { DotIcon, EyeIcon, HeartIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { Form, redirect } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { getLoggedInUserId } from '~/features/users/queries';
import { makeSSRClient } from '~/supa-client';
import { claimIdea } from '../mutations';
import { getGptIdea } from '../queries';
import type { Route } from './+types/idea';

export const meta = ({ loaderData }: Route.MetaArgs) => {
  return [
    { title: `Idea #${loaderData?.idea.gpt_idea_id} | wemake` },
    { name: 'description', content: 'View idea details' },
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { ideaId } = params;
  const idea = await getGptIdea(client, { id: Number(ideaId) });
  if (idea.is_claimed) {
    throw redirect('/ideas');
  }
  return { idea };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const { ideaId } = params;
  const userId = await getLoggedInUserId(client);
  const idea = await getGptIdea(client, { id: Number(ideaId) });
  if (idea.is_claimed) {
    return { ok: false };
  }
  await claimIdea(client, { ideaId: Number(ideaId), userId });
  return redirect('/my/dashboard/ideas');
};

export default function Idea({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title={`Idea #${loaderData.idea.gpt_idea_id}`}
        subtitle='Find ideas for your next project'
      />
      <div className='max-w-screen-sm mx-auto flex flex-col items-center gap-10'>
        <p className='italic'>{loaderData.idea.idea}</p>
        <div className='flex items-center text-sm'>
          <div className='flex items-center gap-1'>
            <EyeIcon className='size-4' />
            <span>{loaderData.idea.views}</span>
          </div>
          <DotIcon className='size-4' />
          <span>{DateTime.fromISO(loaderData.idea.created_at).toRelative()}</span>
          <DotIcon className='size-4' />
          <Button variant='outline' className='flex items-center gap-2'>
            <HeartIcon className='size-4' />
            <span>{loaderData.idea.likes}</span>
          </Button>
        </div>
        {!loaderData.idea.is_claimed && (
          <Form method='post'>
            <Button size='lg'>Claimed idea now &rarr;</Button>
          </Form>
        )}
      </div>
    </div>
  );
}
