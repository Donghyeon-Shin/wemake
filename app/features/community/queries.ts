// import { asc, count, eq } from 'drizzle-orm';
// import db from '~/db';
// import { profiles } from '../users/schema';
// import { post_upvotes, posts, topics } from './schema';

import client from '../../supa-client';

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
  return data;
};
