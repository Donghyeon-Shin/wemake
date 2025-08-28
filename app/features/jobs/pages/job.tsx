import { DotIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { data } from 'react-router';
import { z } from 'zod';
import { Badge } from '~/common/components/ui/badge';
import { Button } from '~/common/components/ui/button';
import { getJobById } from '../queries';
import type { Route } from './+types/job';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Job Details | wemake' }, { name: 'description', content: 'Job Details' }];
};

const paramsSchema = z.object({
  jobId: z.coerce.number(),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 });
  }
  const job = await getJobById({ jobId: parsedData.jobId });
  return { job };
};

export default function Job({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className='bg-gradient-to-tr from-primary/80 to-primary/10 h-60 wull rounded-lg'></div>
      <div className='grid grid-cols-6 -mt-20 gap-20 items-start'>
        <div className='col-span-4 space-y-10'>
          <div>
            <div className='size-40 bg-white rounded-full relative left-10 overflow-hidden object-cover'>
              <img src={loaderData.job.company_logo_url} className='size-full' />
            </div>
            <h1 className='text-4xl font-bold'>{loaderData.job.position}</h1>
            <h4 className='text-lg text-muted-foreground'>{loaderData.job.company_name}</h4>
          </div>
          <div className='flex gap-2 capitalize'>
            <Badge variant='secondary'>{loaderData.job.job_type}</Badge>
            <Badge variant='secondary'>{loaderData.job.location_type}</Badge>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Overview</h4>
            <p className='text-lg text-muted-foreground'>{loaderData.job.overview}</p>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Responsibilities</h4>
            <ul className='text-lg list-disc list-inside'>
              {loaderData.job.responsibilities.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Qualifications</h4>
            <ul className='text-lg list-disc list-inside'>
              {loaderData.job.qualifications.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Benefits</h4>
            <ul className='text-lg list-disc list-inside'>
              {loaderData.job.benefits.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Skills</h4>
            <ul className='text-lg list-disc list-inside'>
              {loaderData.job.skills.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col-span-2 sticky top-20 p-6 border rounded-lg mt-32 space-y-5'>
          <div className='flex flex-col'>
            <span className='text-xl font-medium'>Avg. Salary</span>
            <span className='text-sm text-muted-foreground capitalize'>
              {loaderData.job.salary_range}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-medium'>Location</span>
            <span className='text-sm text-muted-foreground capitalize'>
              {loaderData.job.location_type}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-medium'>Type</span>
            <span className='text-sm text-muted-foreground capitalize'>
              {loaderData.job.job_type}
            </span>
          </div>
          <div className='flex'>
            <span className='text-sm text-muted-foreground'>
              Posted {DateTime.fromISO(loaderData.job.created_at).toRelative()}
            </span>
            <DotIcon className='size-4' />
            <span className='text-sm text-muted-foreground'>395 views</span>
          </div>
          <Button className='w-full'>Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
