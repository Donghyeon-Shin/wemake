import { useOutletContext } from 'react-router';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/profile';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Profile | wemake' }, { name: 'description', content: 'Profile' }];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  await client.rpc('track_event', {
    event_type: 'profile_view',
    event_data: {
      username: params.username,
    },
  });
  return null;
};

export default function Profile() {
  const { headline, bio } = useOutletContext<{ headline: string; bio: string }>();
  return (
    <div className='max-w-screen-md flex flex-col gap-10'>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>Headline</h4>
        <p className='text-muted-foreground'>{headline}</p>
      </div>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>Bio</h4>
        <p className='text-muted-foreground'>{bio}</p>
      </div>
    </div>
  );
}
