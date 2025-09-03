import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/supa-client';

export const getGptIdeas = async (
  client: SupabaseClient<Database>,
  { limit }: { limit: number },
) => {
  const { data, error } = await client.from('gpt_ideas_view').select('*').limit(limit);
  if (error) throw new Error(error.message);
  return data;
};

export const getGptIdea = async (client: SupabaseClient<Database>, { id }: { id: number }) => {
  const { data, error } = await client
    .from('gpt_ideas_view')
    .select('*')
    .eq('gpt_idea_id', id)
    .single(); // 데이터가 하나만 있을 것이라고 Typescript에게 알려줌
  if (error) throw new Error(error.message);
  return data;
};
