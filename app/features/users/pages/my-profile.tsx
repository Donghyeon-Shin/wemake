import { redirect } from 'react-router';
import { makeSSRClient } from '~/supa-client';
import { getUserByProfileId } from '../queries';
import type { Route } from './+types/my-profile';

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserByProfileId(client, { profileId: user.id });
    return redirect(`/users/${profile.username}`);
  }

  return redirect('/auth/login');
}
