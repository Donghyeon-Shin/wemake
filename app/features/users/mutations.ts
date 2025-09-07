import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/supa-client';

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    userId,
    name,
    role,
    headline,
    bio,
  }: {
    userId: string;
    name: string;
    role: 'developer' | 'designer' | 'product Manager' | 'founder' | 'other';
    headline: string;
    bio: string;
  },
) => {
  const { error } = await client
    .from('profiles')
    .update({
      name,
      role,
      headline,
      bio,
    })
    .eq('profile_id', userId);
  if (error) throw new Error(error.message);
};
