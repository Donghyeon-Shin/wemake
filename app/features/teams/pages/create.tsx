import { Form } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '../../../common/components/ui/button';
import { InputPair } from '../../../common/components/ui/input-pair';
import { SelectPair } from '../../../common/components/ui/select-pair';
import type { Route } from './+types/create';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Create a team | wemake' }];
};

export default function Submit() {
  return (
    <div className='space-y-20'>
      <Hero title='Create a team' subtitle='Create a team to the platform' />
      <Form className='max-w-screen-2xl flex flex-col gap-10 items-center mx-auto'>
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
          <SelectPair
            label='What is the stage of your product?'
            name='stage'
            placeholder='Select the stage of your product'
            description='(required)'
            required
            options={[
              { label: 'Idea', value: 'idea' },
              { label: 'Prototype', value: 'prototype' },
              { label: 'MVP', value: 'mvp' },
              { label: 'Launched', value: 'launched' },
            ]}
          />
          <InputPair
            label='What is the size of your team?'
            description='(100 members max)'
            name='size'
            id='size'
            max={100}
            min={1}
            type='number'
          />
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
          <InputPair
            label='What roles are you looking for?'
            description='(comma separated)'
            name='roles'
            id='roles'
            type='text'
            placeholder='React Developer, Backend Developer, Product Manager'
          />
          <InputPair
            label='What is the description of your product?'
            description='(200 characters max)'
            name='description'
            id='description'
            textarea
            placeholder='i.e We are building a new social media platform for dogs...'
            rows={10}
          />
        </div>
        <Button type='submit' className='w-full max-w-sm mx-auto' size='lg'>
          Create team
        </Button>
      </Form>
    </div>
  );
}
