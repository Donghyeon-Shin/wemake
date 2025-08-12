import { DotIcon } from 'lucide-react';
import { Badge } from '~/common/components/ui/badge';
import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/job';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Job Details | wemake' }, { name: 'description', content: 'Job Details' }];
};

export default function Job() {
  return (
    <div>
      <div className='bg-gradient-to-tr from-primary/80 to-primary/10 h-60 wull rounded-lg'></div>
      <div className='grid grid-cols-6 -mt-20 gap-20 items-start'>
        <div className='col-span-4 space-y-10'>
          <div>
            <div className='size-40 bg-white rounded-full relative left-10 overflow-hidden object-cover'>
              <img src='https://github.com/facebook.png' className='size-full' />
            </div>
            <h1 className='text-4xl font-bold'>Software Engineer</h1>
            <h4 className='text-lg text-muted-foreground'>Meta Inc.</h4>
          </div>
          <div className='flex gap-2'>
            <Badge variant='secondary'>Full-time</Badge>
            <Badge variant='secondary'>Remote</Badge>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Overview</h4>
            <p className='text-lg text-muted-foreground'>
              We are looking for a Software Engineer with 3+ years of experience in React, Node.js,
              and MongoDB. The ideal candidate will have a strong understanding of modern web
              development and be able to work independently and as part of a team. We are looking
              for a Software Engineer with 3+ years of experience in React, Node.js, and MongoDB.
              The ideal candidate will have a strong understanding of modern web development and be
              able to work independently and as part of a team.
            </p>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Responsibilities</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                'Develop and maintain web applications using React, Node.js, and MongoDB.',
                'Implement new features and improve existing code.',
                'Collaborate with other developers to ensure timely delivery of projects.',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Qualifications</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                '3+ years of experience in React, Node.js, and MongoDB.',
                'Strong understanding of modern web development.',
                'Ability to work independently and as part of a team.',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Benefits</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                'Flexible working hours',
                'Remote work',
                'Health insurance',
                'Dental insurance',
                'Vision insurance',
                '401(k) plan',
                'Paid time off',
                'Paid holidays',
                'Paid sick days',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Skills</h4>
            <ul className='text-lg list-disc list-inside'>
              {['React', 'Node.js', 'MongoDB', 'TypeScript', 'JavaScript', 'HTML', 'CSS'].map(
                (item) => (
                  <li key={item}>{item}</li>
                ),
              )}
            </ul>
          </div>
        </div>
        <div className='col-span-2 sticky top-20 p-6 border rounded-lg mt-32 space-y-5'>
          <div className='flex flex-col'>
            <span className='text-xl font-medium'>Avg. Salary</span>
            <span className='text-sm text-muted-foreground'>$100,000 - $120,000</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-medium'>Location</span>
            <span className='text-sm text-muted-foreground'>Remote</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-medium'>Type</span>
            <span className='text-sm text-muted-foreground'>Full-time</span>
          </div>
          <div className='flex'>
            <span className='text-sm text-muted-foreground'>Posted 2 days ago</span>
            <DotIcon className='size-4' />
            <span className='text-sm text-muted-foreground'>395 views</span>
          </div>
          <Button className='w-full'>Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
