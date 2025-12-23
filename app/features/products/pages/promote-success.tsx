import { z } from 'zod';
import { makeSSRClient } from '../../../supa-client';
import type { Route } from './+types/promote-success';

const paramsSchema = z.object({
  paymentType: z.string(),
  orderId: z.string(),
  paymentKey: z.string(),
  amount: z.coerce.number(),
});

const TOSS_PAYMENT_SECRET_KEY = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6'; // TODO: 환경변수로 분리

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    return new Response('Invalid params', { status: 400 });
  }

  const encryptedSecretKey = `Basic ${Buffer.from(TOSS_PAYMENT_SECRET_KEY + ':').toString('base64')}`;
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: { Authorization: encryptedSecretKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId: parsedData.orderId,
      paymentKey: parsedData.paymentKey,
      amount: parsedData.amount,
    }),
  });
  const responseData = await response.json();
  return Response.json(responseData);
};
