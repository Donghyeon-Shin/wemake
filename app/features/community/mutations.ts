import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/supa-client';

export const createPost = async (
  client: SupabaseClient<Database>,
  {
    title,
    category,
    content,
    userId,
  }: { title: string; category: string; content: string; userId: string },
) => {
  const { data: categoryData, error: categoryError } = await client
    .from('topics')
    .select('topic_id')
    .eq('slug', category)
    .single();
  if (categoryError) throw new Error(categoryError.message);

  const { data, error } = await client
    .from('posts')
    .insert({ title, content, profile_id: userId, topic_id: categoryData.topic_id })
    .select() // 생성 후 바로 조회
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const createReply = async (
  client: SupabaseClient<Database>,
  {
    postId,
    userId,
    reply,
    topLevelId,
  }: { postId: string; userId: string; reply: string; topLevelId?: number },
) => {
  const { error } = await client.from('post_replies').insert({
    ...(topLevelId ? { parent_id: topLevelId } : { post_id: parseInt(postId) }), // topLevelId가 있으면 대댓글 참조 정보 전달, 없으면 post_id 전달
    profile_id: userId,
    reply,
  });
  if (error) throw new Error(error.message);
  return;
};

export const toggleUpvote = async (
  client: SupabaseClient<Database>,
  { postId, userId }: { postId: string; userId: string },
) => {
  // toggle upvote
  const { count } = await client
    .from('post_upvotes')
    .select('*', { count: 'exact', head: true })
    // count: 'exact' 옵션을 사용하여 정확한 개수를 반환, head: true 옵션을 사용하여 count 값만 전달
    .eq('post_id', parseInt(postId))
    .eq('profile_id', userId);

  if (count === 0) {
    await client.from('post_upvotes').insert({
      post_id: parseInt(postId),
      profile_id: userId,
    });
  } else {
    await client
      .from('post_upvotes')
      .delete()
      .eq('post_id', parseInt(postId))
      .eq('profile_id', userId);
  }
};
