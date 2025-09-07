import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import z from 'zod';
import { Button } from '~/common/components/ui/button';
import { Dialog, DialogTrigger } from '~/common/components/ui/dialog';
import { CreateReviewDialog } from '~/features/products/components/create-review-dialog';
import { ReviewCard } from '~/features/products/components/review-card';
import { getLoggedInUserId } from '~/features/users/queries';
import { makeSSRClient } from '~/supa-client';
import { createReview } from '../mutations';
import { getReviewsByProductId } from '../queries';
import type { Route } from './+types/reviews';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Product Reviews | wemake' },
    { name: 'description', content: 'Product Reviews' },
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { productId } = params;
  const reviews = await getReviewsByProductId(client, { productId: Number(productId) });
  return { reviews };
};

const formSchema = z.object({
  starts: z.coerce.number().min(1, 'Rating is required').max(5, 'Rating must be less than 5'),
  review: z
    .string()
    .min(1, 'Review is required')
    .max(1000, 'Review must be less than 1000 characters'),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { productId } = params;
  const formData = await request.formData();
  const { success, data: parsedData, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: z.flattenError(error).fieldErrors };
  }
  await createReview(client, {
    productId,
    userId,
    rating: parsedData.starts,
    review: parsedData.review,
  });
  return { ok: true };
};

export default function ProductReviews({ loaderData, actionData }: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: number }>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (actionData?.ok) {
      setOpen(false);
    }
  }, [actionData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className='space-y-10 max-w-xl'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>
            {review_count} {review_count === 1 ? 'Review' : 'Reviews'}
          </h2>
          <DialogTrigger>
            <Button variant='secondary'>Write a Review</Button>
          </DialogTrigger>
        </div>
        <div className='space-y-20'>
          {loaderData.reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              name={review.user.name}
              username={review.user.username}
              avatar={review.user.avatar}
              rating={review.rating}
              content={review.review}
              postedAt={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
