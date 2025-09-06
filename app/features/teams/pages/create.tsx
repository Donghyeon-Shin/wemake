import { Form, redirect } from 'react-router';
import z from 'zod';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import { SelectPair } from '~/common/components/ui/select-pair';
import { getLoggedInUserId } from '~/features/users/queries';
import { makeSSRClient } from '~/supa-client';
import { PRODUCT_STAGE } from '../constants';
import { createTeam } from '../mutations';
import type { Route } from './+types/create';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Create a team | wemake' }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(20, 'Name must be less than 20 characters'),
  stage: z.string().min(1, 'Stage is required'),
  size: z.coerce.number().min(1, 'Size is required').max(100, 'Size must be less than 100'),
  equity: z.coerce.number().min(1, 'Equity is required').max(100, 'Equity must be less than 100'),
  roles: z.string().min(1, 'Roles is required').max(100, 'Roles must be less than 100'),
  description: z.string().min(1, 'Description is required'),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data: parsedData, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: z.flattenError(error).fieldErrors };
  }
  const { team_id } = await createTeam(client, parsedData, userId);
  return redirect(`/teams/${team_id}`);
};

export default function Submit({ actionData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <Hero title='Create a team' subtitle='Create a team to the platform' />
      <Form className='max-w-screen-2xl flex flex-col gap-10 items-center mx-auto' method='post'>
        <div className='grid grid-cols-3 gap-10'>
          <InputPair
            label='What is the name of your product?'
            description='(20 characters max)'
            name='name'
            id='name'
            maxLength={20}
            type='text'
            required
            placeholder='i.e Doggy Social'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.name?.join(', ')}</p>
          )}
          <SelectPair
            label='What is the stage of your product?'
            name='stage'
            placeholder='Select the stage of your product'
            description='(required)'
            required
            options={PRODUCT_STAGE}
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.stage?.join(', ')}</p>
          )}
          <InputPair
            label='What is the size of your team?'
            description='(100 members max)'
            name='size'
            id='size'
            max={100}
            min={1}
            type='number'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.size?.join(', ')}</p>
          )}
          <InputPair
            label='How much equity are you willing to give?'
            description='(100% max)'
            name='equity'
            id='equity'
            max={100}
            min={1}
            type='number'
            placeholder='100'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.equity?.join(', ')}</p>
          )}
          <InputPair
            label='What roles are you looking for?'
            description='(comma separated)'
            name='roles'
            id='roles'
            type='text'
            placeholder='React Developer, Backend Developer, Product Manager'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.roles?.join(', ')}</p>
          )}
          <InputPair
            label='What is the description of your product?'
            description='(200 characters max)'
            name='description'
            id='description'
            textarea
            placeholder='i.e We are building a new social media platform for dogs...'
            rows={10}
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.description?.join(', ')}</p>
          )}
        </div>
        <Button type='submit' className='w-full max-w-sm mx-auto' size='lg'>
          Create team
        </Button>
      </Form>
    </div>
  );
}
