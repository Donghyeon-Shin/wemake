import { DateTime } from 'luxon';
import { Hero } from '~/common/components/layout/hero';
import { IdeaCard } from '~/features/ideas/components/idea-card';
import { makeSSRClient } from '~/supa-client';
import { getGptIdeas } from '../queries';
import type { Route } from './+types/ideas';

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: 'IdeasGPT | wemake',
    },
    { name: 'description', content: 'Find ideas for your next project' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const gptIdeas = await getGptIdeas(client, { limit: 10 });
  return { gptIdeas };
};

export default function Ideas({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <Hero title='IdeasGPT' subtitle='Find ideas for your next project' />
      <div className='grid grid-cols-4 gap-4'>
        {loaderData.gptIdeas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewsCount={idea.views}
            likesCount={idea.likes}
            postedAt={DateTime.fromISO(idea.created_at).toRelative() ?? ''}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
    </div>
  );
}
