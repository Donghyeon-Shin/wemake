import { Form } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { InputPair } from '~/common/components/ui/input-pair';
import { SelectPair } from '~/common/components/ui/select-pair';
import type { Route } from './+types/submit';

export const meta: Route.MetaFunction = () => [
  { title: 'Submit Product | wemake' },
  { name: 'desciption', content: 'Submit your product' },
];

export default function SubmitProductPage({ actionData }: Route.ComponentProps) {
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
        </div>
      </Form>
    </div>
  );
}
