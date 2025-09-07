import { useState } from 'react';
import { Form, redirect } from 'react-router';
import z from 'zod';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { InputPair } from '~/common/components/ui/input-pair';
import { Label } from '~/common/components/ui/label';
import { SelectPair } from '~/common/components/ui/select-pair';
import { getLoggedInUserId } from '~/features/users/queries';
import { makeSSRClient } from '~/supa-client';
import { createProduct } from '../mutations';
import { getCategories } from '../queries';
import type { Route } from './+types/submit-product';

export const meta: Route.MetaFunction = () => [
  { title: 'Submit Product | wemake' },
  { name: 'desciption', content: 'Submit your product' },
];

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  url: z.string().min(1, 'URL is required'),
  description: z.string().min(1, 'Description is required'),
  howItWorks: z.string().min(1, 'How It Works is required'),
  category: z.coerce.number(),
  icon: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2097152 && file.type.startsWith('image/'),
      'Icon must be less than 2MB and must be an image',
    ),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const categories = await getCategories(client);
  return { categories };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data: parsedData, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: z.flattenError(error).fieldErrors };
  }
  const { name, tagline, url, description, category, icon, howItWorks } = parsedData;
  const { error: uploadError, data: uploadData } = await client.storage
    .from('icons')
    .upload(`${userId}/${Date.now()}`, icon, {
      contentType: icon.type,
      upsert: false,
    });
  if (uploadError) {
    return { fieldErrors: { icon: uploadError.message } };
  }
  const {
    data: { publicUrl },
  } = await client.storage.from('icons').getPublicUrl(uploadData.path);
  if (!publicUrl) {
    return { fieldErrors: { icon: 'Icon failed to upload' } };
  }
  const { product_id: productId } = await createProduct(client, {
    name,
    tagline,
    url,
    description,
    categoryId: category,
    icon: publicUrl,
    userId,
    howItWorks,
  });
  return redirect(`/products/${productId}`);
};

export default function SubmitProductPage({ loaderData, actionData }: Route.ComponentProps) {
  const [icon, setIcon] = useState<string | null>(null);

  const onIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setIcon(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <Hero title='Submit Your Product' subtitle='Share your product with the world' />
      <Form
        className='grid grid-cols-2 gap-10 max-w-screen-lg mx-auto'
        method='post'
        encType='multipart/form-data'
      >
        <div className='space-y-5'>
          <InputPair
            label='Name'
            description='The name of your product.'
            type='text'
            id='name'
            name='name'
            placeholder='Name of your product'
            required
          />
          {actionData?.fieldErrors && 'name' in actionData.fieldErrors && (
            <p className='text-red-500'>{actionData.fieldErrors.name}</p>
          )}
          <InputPair
            label='Tagline'
            description='60 characters or less'
            type='text'
            id='tagline'
            name='tagline'
            placeholder='A concise description of your product'
            required
          />
          {actionData?.fieldErrors && 'tagline' in actionData.fieldErrors && (
            <p className='text-red-500'>{actionData.fieldErrors.tagline}</p>
          )}
          <InputPair
            label='URL'
            description='The URL of your product.'
            type='url'
            id='url'
            name='url'
            placeholder='https://example.com'
            required
          />
          {actionData?.fieldErrors && 'url' in actionData.fieldErrors && (
            <p className='text-red-500'>{actionData.fieldErrors.url}</p>
          )}
          <InputPair
            label='Description'
            description='A detailed description of your product.'
            textarea
            id='description'
            name='description'
            placeholder='A detailed description of your product.'
            required
          />
          {actionData?.fieldErrors && 'description' in actionData.fieldErrors && (
            <p className='text-red-500'>{actionData.fieldErrors.description}</p>
          )}
          <InputPair
            label='How It Works'
            description='A detailed description of how your product works.'
            textarea
            id='howItWorks'
            name='howItWorks'
            placeholder='A detailed description of how your product works.'
            required
          />
          {actionData?.fieldErrors && 'howItWorks' in actionData.fieldErrors && (
            <p className='text-red-500'>{actionData.fieldErrors.howItWorks}</p>
          )}
          <SelectPair
            name='category'
            required
            label='Category'
            placeholder='Select a category'
            options={loaderData.categories.map((category) => ({
              label: category.name,
              value: category.category_id.toString(),
            }))}
            description='The category of your product.'
          />
          {actionData?.fieldErrors && 'category' in actionData.fieldErrors && (
            <p className='text-red-500'>{actionData.fieldErrors.category}</p>
          )}
          <Button type='submit' className='w-full size-lg'>
            Submit
          </Button>
        </div>
        <div className='flex flex-col space-y-2'>
          <div className='size-40 rounded-xl shadow-xl overflow-hidden'>
            {icon ? <img src={icon} alt='icon' className='object-cover size-full' /> : null}
          </div>
          <Label className='flex flex-col items-start justify-start gap-1'>
            Icon
            <small className='text-muted-foreground'>This is the icon of your product</small>
          </Label>
          <Input type='file' className='w-1/2' onChange={onIconChange} required name='icon' />
          {actionData?.fieldErrors && 'icon' in actionData.fieldErrors && (
            <p className='text-red-500'>{actionData.fieldErrors.icon}</p>
          )}
          <div className='flex flex-col text-xs'>
            <span className='text-muted-foreground'>Recommended size: 128x128px</span>
            <span className='text-muted-foreground'>Allowed formats: PNG, JPEG</span>
            <span className='text-muted-foreground'>Max file size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}
