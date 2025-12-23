import { loadTossPayments, type TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';
import type { DateRange } from 'react-day-picker';
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

  const widget = useRef<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    const initToss = async () => {
      const toss = loadTossPayments('test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm');
      widget.current = (await toss).widgets({
        customerKey: '1111', // 유저 고유 키(UUID 같이 유니크한 값을 넣어야 함)
      });
      await widget.current.setAmount({
        value: 0,
        currency: 'KRW',
      });
      await widget.current.renderPaymentMethods({
        selector: '#toss-payment-methods',
      });
      await widget.current.renderAgreement({
        selector: '#toss-payment-agreement',
      });
    };
    initToss();
  }, []);

  useEffect(() => {
    const updateAmount = async () => {
      if (widget.current) {
        await widget.current.setAmount({
          value: totalDays * 3,
          currency: 'KRW',
        });
      }
    };
    updateAmount();
  }, [promotionPeriod]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const product = formData.get('product') as string;
    if (!product || !promotionPeriod?.to || !promotionPeriod?.from) return;
    await widget.current?.requestPayment({
      orderId: crypto.randomUUID(),
      orderName: `Promotion for ${product}`,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerMobilePhone: '01012345678',
      metadata: {
        product,
        promotionFrom: DateTime.fromJSDate(promotionPeriod.from).toISO(),
        promotionTo: DateTime.fromJSDate(promotionPeriod.to).toISO(),
      },
      successUrl: `${window.location.origin}/products/promote/success`,
      failUrl: `${window.location.origin}/products/promote/fail`,
    });
  };
  return (
    <div>
      <Hero title='Promote Your Product' subtitle='Boost your product visibility.' />
      <form onSubmit={handleSubmit} method='post' className='grid grid-cols-6 gap-10'>
        <div className='col-span-3 mx-auto flex flex-col gap-10 items-start'>
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
              <small className='text-muted-foreground text-center'>
                Minimum duration is 3 days
              </small>
            </div>
            <Calendar
              mode='range'
              selected={promotionPeriod}
              onSelect={setPromotionPeriod}
              min={3}
              disabled={{ before: new Date() }}
            />
          </div>
        </div>
        <aside className='col-span-3 px-20 flex flex-col items-center'>
          <div id='toss-payment-methods' className='w-full'></div>
          <div id='toss-payment-agreement' className='w-full'></div>
          <Button className='w-full mt-10' disabled={totalDays === 0} type='submit'>
            Check out{' '}
            {(totalDays * 3).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
          </Button>
        </aside>
      </form>
    </div>
  );
}
