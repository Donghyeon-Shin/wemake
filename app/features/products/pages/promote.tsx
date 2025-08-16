import { DateTime } from 'luxon';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Form } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Calendar } from '~/common/components/ui/calendar';
import { Label } from '~/common/components/ui/label';
import { SelectPair } from '~/common/components/ui/select-pair';
import { Button } from '../../../common/components/ui/button';
import type { Route } from './+types/promote';

export const meta: Route.MetaFunction = () => [
  { title: 'Promote Product | wemake' },
  { name: 'description', content: 'Promote a product to the world.' },
];

export default function PromoteProductPage() {
  const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>();

  const totalDays =
    promotionPeriod?.from && promotionPeriod?.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          'days',
        ).days
      : 0;
  return (
    <div>
      <Hero title='Promote Your Product' subtitle='Boost your product visibility.' />
      <Form className='max-w-screen-sm mx-auto flex flex-col gap-10 items-center'>
        <SelectPair
          label='Product'
          description='The product you want to promote.'
          placeholder='Select a product'
          name='product'
          required
          options={[
            { label: 'AI Dark Mode Maker', value: 'ai-dark-mode-maker' },
            { label: 'AI Dark Mode Maker', value: 'ai-dark-mode-maker-1' },
            { label: 'AI Dark Mode Maker', value: 'ai-dark-mode-maker-2' },
          ]}
        />
        <div className='flex flex-col gap-2 items-center w-full'>
          <div className='flex flex-col gap-1'>
            <Label>Select a range of dates for promotion</Label>
            <small className='text-muted-foreground text-center'>Minimum duration is 3 days</small>
          </div>
          <Calendar
            mode='range'
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={{ before: new Date() }}
          />
        </div>
        <Button disabled={totalDays === 0} type='submit'>
          Go to checkout {`($${totalDays * 20})`}
        </Button>
      </Form>
    </div>
  );
}
