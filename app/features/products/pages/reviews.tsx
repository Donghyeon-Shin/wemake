import { Button } from '~/common/components/ui/button';
import { Dialog, DialogTrigger } from '~/common/components/ui/dialog';
import { CreateReviewDialog } from '~/features/products/components/create-review-dialog';
import { ReviewCard } from '~/features/products/components/review-card';
import type { Route } from './+types/reviews';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Product Reviews | wemake' },
    { name: 'description', content: 'Product Reviews' },
  ];
};

export default function ProductReviews() {
  return (
    <Dialog>
      <div className='space-y-10 max-w-xl'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>10 Reviews</h2>
          <DialogTrigger>
            <Button variant='secondary'>Write a Review</Button>
          </DialogTrigger>
        </div>
        <div className='space-y-20'>
          {Array.from({ length: 10 }).map((_, index) => (
            <ReviewCard
              key={index}
              name='John Doe'
              username='johndoe'
              avatar='https://github.com/shadcn.png'
              rating={5}
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
              postedAt='10 days ago'
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
