import type { DateTime } from 'luxon';
import client from '~/supa-client';
import { PAGE_SIZE } from './constants';

export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  page?: number;
  limit: number;
}) => {
  const { data, error } = await client
    .from('products')
    .select(
      'product_id, name, description, upvotes: stats->>upvotes, views: stats->>views, reviews: stats->>reviews',
    )
    .lte('created_at', endDate.toISO())
    .gte('created_at', startDate.toISO())
    .order('stats->>upvotes', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;

  return data;
};

export const getProductPagesByDateRange = async ({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) => {
  const { count, error } = await client
    .from('products')
    .select('product_id', { count: 'exact', head: true }) // head: true 는 카운트 값만 반환
    .lte('created_at', endDate.toISO())
    .gte('created_at', startDate.toISO());

  if (error) throw error;
  if (!count) return 1;

  return Math.ceil(count / PAGE_SIZE);
};

export const getCategories = async () => {
  const { data, error } = await client.from('categories').select('category_id, name, description');
  if (error) throw error;
  return data;
};

export const getCategory = async ({ categoryId }: { categoryId: number }) => {
  const { data, error } = await client
    .from('categories')
    .select('category_id, name, description')
    .eq('category_id', categoryId)
    .single();
  if (error) throw error;
  return data;
};

export const getProductsByCategory = async ({
  categoryId,
  page,
}: {
  categoryId: number;
  page: number;
}) => {
  const { data, error } = await client
    .from('products')
    .select(
      'product_id, name, description, upvotes: stats->>upvotes, views: stats->>views, reviews: stats->>reviews',
    )
    .eq('category_id', categoryId)
    .order('stats->>upvotes', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getCategoryPages = async ({ categoryId }: { categoryId: number }) => {
  const { count, error } = await client
    .from('products')
    .select('product_id', { count: 'exact', head: true })
    .eq('category_id', categoryId);
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};
