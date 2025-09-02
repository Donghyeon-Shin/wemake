import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/supa-client';

export const checkUsernameExists = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
  const { error } = await client
    .from('profiles')
    .select('profile_id')
    .eq('username', username)
    .single();
  if (error) {
    return false;
  }
  return true;
};
