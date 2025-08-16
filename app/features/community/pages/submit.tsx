import { Form } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '../../../common/components/ui/button';
import { InputPair } from '../../../common/components/ui/input-pair';
import { SelectPair } from '../../../common/components/ui/select-pair';
import type { Route } from './+types/submit';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Submit | wemake' }];
};

export default function Submit() {
  return (
    <div>
      <Hero title='Create Discussion' subtitle='Create a new discussion' />
      <Form className='flex flex-col gap-10 max-w-screen-md mx-auto'>
        <InputPair
          label='Title'
          name='title'
          id='title'
          description='(40 characters max)'
          maxLength={40}
          required
          placeholder='i.e. What is the best productivity tool?'
        />
        <SelectPair
          label='Category'
          name='category'
          required
          placeholder='i.e. Productivity'
          options={[
            {
              label: 'Productivity',
              value: 'productivity',
            },
            {
              label: 'Design',
              value: 'design',
            },
            {
              label: 'Programming',
              value: 'programming',
            },
          ]}
          description='Select a category'
        />
        <InputPair
          label='Content'
          name='content'
          id='content'
          description='(1000 characters max)'
          required
          placeholder='i.e. I am looking for a tool that can help me manage my time and improve my productivity.'
          textarea
        />
        <Button type='submit' className='mx-auto'>
          Create Discussion
        </Button>
      </Form>
    </div>
  );
}
