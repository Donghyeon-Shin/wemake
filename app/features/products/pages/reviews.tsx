import { useOutletContext } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Dialog, DialogTrigger } from '~/common/components/ui/dialog';
import { CreateReviewDialog } from '~/features/products/components/create-review-dialog';
import { ReviewCard } from '~/features/products/components/review-card';
import { makeSSRClient } from '~/supa-client';
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

export default function ProductReviews({ loaderData }: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: number }>();
  return (
    <Dialog>
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
