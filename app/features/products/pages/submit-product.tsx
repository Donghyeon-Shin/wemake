import { useState } from 'react';
import { Form } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { InputPair } from '~/common/components/ui/input-pair';
import { Label } from '~/common/components/ui/label';
import { SelectPair } from '~/common/components/ui/select-pair';
import type { Route } from './+types/submit-product';

export const meta: Route.MetaFunction = () => [
  { title: 'Submit Product | wemake' },
  { name: 'desciption', content: 'Submit your product' },
];

export default function SubmitProductPage({ actionData }: Route.ComponentProps) {
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
      <Form className='grid grid-cols-2 gap-10 max-w-screen-lg mx-auto'>
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
          <InputPair
            label='Tagline'
            description='60 characters or less'
            type='text'
            id='tagline'
            name='tagline'
            placeholder='A concise description of your product'
            required
          />
          <InputPair
            label='URL'
            description='The URL of your product.'
            type='url'
            id='url'
            name='url'
            placeholder='https://example.com'
            required
          />
          <InputPair
            label='Description'
            description='A detailed description of your product.'
            textarea
            id='description'
            name='description'
            placeholder='A detailed description of your product.'
            required
          />
          <SelectPair
            name='category'
            required
            label='Category'
            placeholder='Select a category'
            options={[
              { label: 'Productivity', value: 'productivity' },
              { label: 'Marketing', value: 'marketing' },
              { label: 'Design', value: 'design' },
              { label: 'Development', value: 'development' },
              { label: 'Other', value: 'other' },
            ]}
            description='The category of your product.'
          />
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
