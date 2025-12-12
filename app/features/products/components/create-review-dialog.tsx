import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import { Form, useActionData } from 'react-router';
import { Button } from '~/common/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/common/components/ui/dialog';
import { InputPair } from '~/common/components/ui/input-pair';
import { Label } from '~/common/components/ui/label';
import type { action } from '../pages/reviews';

export function CreateReviewDialog() {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const actionData = useActionData<typeof action>();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='text-2xl'>What do you think about this product?</DialogTitle>
        <DialogDescription>Share your thoughts and experiences with others.</DialogDescription>
      </DialogHeader>
      <Form className='space-y-10' method='post'>
        <div>
          <Label className='flex flex-col gap-1 items-start justify-start'>
            Rating{' '}
            <small className='text-muted-foreground'>What would you rate this product?</small>
          </Label>
          <div className='flex gap-2 mt-5'>
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className='relative'
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                <StarIcon
                  className='size-4 text-yellow-400 cursor-pointer'
                  fill={hoveredStar >= star || rating >= star ? 'currentColor' : 'none'}
                />
                <input
                  type='radio'
                  name='starts'
                  value={star}
                  required
                  className='opacity-0 h-px w-px absolute'
                  onChange={() => setRating(star)}
                />
              </label>
            ))}
          </div>
          {actionData?.fieldErrors?.starts && (
            <p className='text-red-500'>{actionData.fieldErrors.starts.join(', ')}</p>
          )}
        </div>
        <InputPair
          textarea
          required
          label='Review'
          name='review'
          description='Maximum 1000 characters'
          placeholder='Tell us more about your experience with this product.'
        />
        {actionData?.fieldErrors?.review && (
          <p className='text-red-500'>{actionData.fieldErrors.review.join(', ')}</p>
        )}
        <DialogFooter>
          <Button type='submit'>Submit review</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
