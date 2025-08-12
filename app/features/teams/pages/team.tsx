import { Form } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Badge } from '~/common/components/ui/badge';
import { Button } from '~/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../common/components/ui/card';
import { InputPair } from '../../../common/components/ui/input-pair';
import type { Route } from './+types/team';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Team | wemake' }];
};

export default function Team() {
  return (
    <div className='space-y-20'>
      <Hero title="Join lynn's team" />
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 grid grid-cols-4 gap-5'>
          {[
            {
              title: 'Product name',
              value: 'Doggy Social',
            },
            {
              title: 'Stage',
              value: 'MVP',
            },
            {
              title: 'Team size',
              value: '100',
            },
            {
              title: 'Available equity',
              value: '50',
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {item.title}
                </CardTitle>
                <CardContent className='p-o font-bold text-2xl'>
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Looking for
              </CardTitle>
              <CardContent className='p-o font-bold text-2xl'>
                <ul className='text-lg list-disc list-inside'>
                  {[
                    'React Developer',
                    'Backend Developer',
                    'Product Manager',
                    'UI/UX Designer',
                  ].map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Idea description
              </CardTitle>
              <CardContent className='p-o font-medium text-xl'>
                <p>
                  We are building a new social media platform for dogs. We are looking for a React
                  Developer, Backend Developer, Product Manager, and UI/UX Designer.
                </p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className='col-span-2 space-y-5 p-6 border rounded-lg shadow-sm'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              <AvatarImage src='https://github.com/shadcn.png' alt='John Doe' />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <h4 className='text-lg font-bold'>Nicolas</h4>
              <Badge variant='secondary'>Productivity</Badge>
            </div>
          </div>
          <div className='text-sm flex flex-col gap-2'>
            <span>🎂 Joined 3 months ago</span>
            <span>🚀 Launched 1000 products</span>
          </div>
          <Form className='space-y-5'>
            <InputPair
              label='Introduce yourself'
              description='Tell us about yourself'
              name='introduction'
              id='introduction'
              textarea
              placeholder='i.e I am a React Developer with 3 years of experience'
              required
            />
            <Button type='submit' className='w-full'>
              Get in touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
