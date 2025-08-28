// import { asc, count, eq } from 'drizzle-orm';
// import db from '~/db';
// import { profiles } from '../users/schema';
// import { post_upvotes, posts, topics } from './schema';

import { DateTime } from 'luxon';
import client from '~/supa-client';

// export const getTopics = async () => {
//   const allTopcis = await db
//     .select({
//       name: topics.name,
//       slug: topics.slug,
//     })
//     .from(topics);
//   return allTopcis;
// };

// export const getPosts = async () => {
//   const allPosts = await db
//     .select({
//       id: posts.post_id,
//       title: posts.title,
//       createdAt: posts.created_at,
//       topic: topics.name,
//       author: profiles.name,
//       authorAvatarUrl: profiles.avatar,
//       username: profiles.username,
//       votesCount: count(post_upvotes.post_id),
//     })
//     .from(posts)
//     .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
//     .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//     .leftJoin(post_upvotes, eq(posts.post_id, post_upvotes.post_id))
//     .groupBy(posts.post_id, profiles.name, profiles.avatar, profiles.username, topics.name)
//     .orderBy(asc(posts.created_at));
//   return allPosts;
// };

export const getTopics = async () => {
  const { data, error } = await client.from('topics').select('name, slug');
  if (error) throw new Error(error.message);
  return data;
};

export const getPosts = async ({
  limit,
  sorting,
  period = 'all',
  keyword,
  topic,
}: {
  limit: number;
  sorting: 'newest' | 'popular';
  period?: 'all' | 'day' | 'week' | 'month' | 'year';
  keyword?: string;
  topic?: string;
}) => {
  // supabase는 기본적으로 left join을 사용

  // 기본 쿼리
  const baseQuery = client.from('community_post_list_view').select('*').limit(limit);

  // 정렬 조건
  if (sorting === 'newest') {
    baseQuery.order('created_at', { ascending: false });
  } else {
    if (period === 'all') {
      baseQuery.order('upvotes', { ascending: false });
    } else {
      const today = DateTime.now();
      if (period === 'day') {
        baseQuery.gte('created_at', today.startOf('day').toISO());
      } else if (period === 'week') {
        baseQuery.gte('created_at', today.startOf('week').toISO());
      } else if (period === 'month') {
        baseQuery.gte('created_at', today.startOf('month').toISO());
      } else if (period === 'year') {
        baseQuery.gte('created_at', today.startOf('year').toISO());
      }
      baseQuery.order('upvotes', { ascending: false });
    }
  }

  if (keyword) {
    baseQuery.ilike('title', `%${keyword}%`); // ilike : sql injection 자동 방지
  }

  if (topic) {
    baseQuery.eq('topic_slug', topic);
  }

  const { data, error } = await baseQuery;
  if (error) throw new Error(error.message);
  return data;
};
