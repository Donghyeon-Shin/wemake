import { useState } from 'react';
import { Form } from 'react-router';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '~/common/components/ui/alert';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { InputPair } from '~/common/components/ui/input-pair';
import { Label } from '~/common/components/ui/label';
import { SelectPair } from '~/common/components/ui/select-pair';
import { makeSSRClient } from '~/supa-client';
import { updateUser } from '../mutations';
import { getLoggedInUserId, getUserByProfileId } from '../queries';
import type { Route } from './+types/settings';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserByProfileId(client, { profileId: userId });
  return { user };
};

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['developer', 'designer', 'product Manager', 'founder', 'other']),
  headline: z.string().optional().default(''),
  bio: z.string().optional().default(''),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data: parsedData, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: z.flattenError(error).fieldErrors };
  }
  const { name, role, headline, bio } = parsedData;
  await updateUser(client, { userId, name, role, headline, bio });
  return {
    ok: true,
  };
};

export default function Settings({ loaderData, actionData }: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  const onIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className='space-y-20'>
      <div className='grid grid-cols-6 gap-40'>
        <div className='col-span-4 flex flex-col gap-10'>
          {actionData?.ok && 'ok' in actionData && (
            <Alert>
              <AlertTitle>Profile updated successfully</AlertTitle>
              <AlertDescription>Your profile has been updated successfully</AlertDescription>
            </Alert>
          )}
          <h2 className='text-2xl font-semibold'>Edit profile</h2>
          <Form className='flex flex-col w-1/2 gap-5' method='post'>
            <InputPair
              label='Name'
              description='Your public display name.'
              required
              id='name'
              name='name'
              placeholder='John Doe'
              defaultValue={loaderData.user.name}
            />
            {actionData?.fieldErrors?.name && 'name' in actionData.fieldErrors && (
              <p className='text-red-500'>{actionData.fieldErrors.name}</p>
            )}
            <SelectPair
              label='Role'
              description='What role do you do identify the most with'
              placeholder='Select your role'
              required
              name='role'
              defaultValue={loaderData.user.role}
              options={[
                { label: 'Developer', value: 'developer' },
                { label: 'Designer', value: 'designer' },
                { label: 'Product Manager', value: 'product Manager' },
                { label: 'Founder', value: 'founder' },
                { label: 'Other', value: 'other' },
              ]}
            />
            {actionData?.fieldErrors?.role && 'role' in actionData.fieldErrors && (
              <p className='text-red-500'>{actionData.fieldErrors.role}</p>
            )}
            <InputPair
              label='Headline'
              description='An introduction to your profile.'
              id='headline'
              name='headline'
              placeholder='I am a software engineer...'
              required
              defaultValue={loaderData.user.headline || ''}
              textarea
            />
            {actionData?.fieldErrors?.headline && 'headline' in actionData.fieldErrors && (
              <p className='text-red-500'>{actionData.fieldErrors.headline}</p>
            )}
            <InputPair
              label='Bio'
              description='Your public bio.'
              id='bio'
              name='bio'
              placeholder='I am a software engineer...'
              required
              defaultValue={loaderData.user.bio || ''}
              textarea
            />
            {actionData?.fieldErrors?.bio && 'bio' in actionData.fieldErrors && (
              <p className='text-red-500'>{actionData.fieldErrors.bio}</p>
            )}
            <Button className='w-full'>Update</Button>
          </Form>
        </div>
        <aside className='col-span-2 p-6 rounded-lg border shadow-md'>
          <Label className='flex flex-col items-start justify-start gap-1'>
            Avatar
            <small className='text-muted-foreground'>This is your public avatar</small>
          </Label>
          <div className='space-y-5'>
            <div className='size-40 rounded-full shadow-xl overflow-hidden'>
              {avatar ? <img src={avatar} alt='avatar' className='object-cover size-full' /> : null}
            </div>
            <Input type='file' className='w-1/2' onChange={onIconChange} required name='avatar' />
            <div className='flex flex-col text-xs'>
              <span className='text-muted-foreground'>Recommended size: 128x128px</span>
              <span className='text-muted-foreground'>Allowed formats: PNG, JPEG</span>
              <span className='text-muted-foreground'>Max file size: 1MB</span>
            </div>
          </div>
          <Button className='w-full'>Update</Button>
        </aside>
      </div>
    </div>
  );
}
