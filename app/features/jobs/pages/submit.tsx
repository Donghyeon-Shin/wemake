import { Form, redirect } from 'react-router';
import z from 'zod';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import { SelectPair } from '~/common/components/ui/select-pair';
import { getLoggedInUserId } from '~/features/users/queries';
import { makeSSRClient } from '~/supa-client';
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from '../constants';
import { createJob } from '../mutations';
import type { Route } from './+types/submit';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Job | wemake' },
    { name: 'description', content: 'Submit a new job posting' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  position: z
    .string()
    .min(1, 'Position is required')
    .max(40, 'Position must be less than 40 characters'),
  overview: z
    .string()
    .min(1, 'Overview is required')
    .max(400, 'Overview must be less than 400 characters'),
  responsibilities: z
    .string()
    .min(1, 'Responsibilities is required')
    .max(400, 'Responsibilities must be less than 400 characters'),
  qualifications: z
    .string()
    .min(1, 'Qualifications is required')
    .max(400, 'Qualifications must be less than 400 characters'),
  benefits: z
    .string()
    .min(1, 'Benefits is required')
    .max(400, 'Benefits must be less than 400 characters'),
  skills: z
    .string()
    .min(1, 'Skills is required')
    .max(400, 'Skills must be less than 400 characters'),
  company: z
    .string()
    .min(1, 'Company is required')
    .max(40, 'Company must be less than 40 characters'),
  companyLogo: z.url('Company Logo must be a valid URL').min(1, 'Company Logo is required'),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(40, 'Location must be less than 40 characters'),
  applyUrl: z.url('Apply URL must be a valid URL').min(1, 'Apply URL is required'),
  jobType: z.enum(JOB_TYPES.map((type) => type.value)),
  jobLocation: z.enum(LOCATION_TYPES.map((location) => location.value)),
  salaryRange: z.enum(SALARY_RANGES),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data: parsedData, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: z.flattenError(error).fieldErrors };
  }
  const { job_id } = await createJob(client, parsedData);
  return redirect(`/jobs/${job_id}`);
};

export default function SubmitJob({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title='Post a Job' subtitle='Reach out to the best talent in the industry' />
      <Form className='max-w-screen-2xl flex flex-col gap-10 items-center mx-auto' method='post'>
        <div className='grid grid-cols-3 gap-10'>
          <InputPair
            id='position'
            label='Position'
            description='(40 characters max)'
            name='position'
            maxLength={40}
            type='text'
            required
            placeholder='i.e Senior React Developer'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.position?.join(', ')}</p>
          )}
          <InputPair
            id='overview'
            label='Overview'
            description='(400 characters max)'
            name='overview'
            maxLength={400}
            type='text'
            required
            placeholder='i.e We are looking for a Senior React Developer with 3+ years of experience in React, Node.js, and MongoDB.'
            textarea
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.overview?.join(', ')}</p>
          )}
          <InputPair
            id='responsibilities'
            label='Responsibilities'
            description='(400 characters max, comma separated)'
            name='responsibilities'
            maxLength={400}
            type='text'
            required
            placeholder='i.e Implement new features, improve existing code, etc.'
            textarea
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.responsibilities?.join(', ')}</p>
          )}
          <InputPair
            id='qualifications'
            label='Qualifications'
            description='(400 characters max, comma separated)'
            name='qualifications'
            maxLength={400}
            type='text'
            required
            placeholder='i.e 3+ years of experience in React, Node.js, and MongoDB.'
            textarea
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.qualifications?.join(', ')}</p>
          )}
          <InputPair
            id='benefits'
            label='Benefits'
            description='(400 characters max, comma separated)'
            name='benefits'
            maxLength={400}
            type='text'
            required
            placeholder='i.e Flexible working hours, remote work, health insurance, dental insurance, vision insurance, 401(k) plan, paid time off, paid holidays, paid sick days.'
            textarea
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.benefits?.join(', ')}</p>
          )}
          <InputPair
            id='skills'
            label='Skills'
            description='(400 characters max, comma separated)'
            name='skills'
            maxLength={400}
            type='text'
            required
            placeholder='i.e React, Node.js, MongoDB, TypeScript, JavaScript, HTML, CSS.'
            textarea
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.skills?.join(', ')}</p>
          )}
          <InputPair
            id='company'
            label='Company Name'
            description='(40 characters max)'
            name='company'
            maxLength={40}
            type='text'
            required
            placeholder='i.e Meta Inc.'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.company?.join(', ')}</p>
          )}
          <InputPair
            id='companyLogo'
            label='Company Logo URL'
            description='Image URL'
            name='companyLogo'
            type='url'
            required
            placeholder='i.e https://example.com/logo.png'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.companyLogo?.join(', ')}</p>
          )}
          <InputPair
            id='location'
            label='Location'
            description='(40 characters max)'
            name='location'
            maxLength={40}
            type='text'
            required
            placeholder='i.e Remote'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.location?.join(', ')}</p>
          )}
          <InputPair
            id='applyUrl'
            label='Apply URL'
            description='URL'
            name='applyUrl'
            type='url'
            required
            placeholder='i.e https://example.com/apply'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.applyUrl?.join(', ')}</p>
          )}
          <SelectPair
            label='Job Type'
            description='Select the type of job you are posting'
            name='jobType'
            options={JOB_TYPES.map((type) => ({ label: type.label, value: type.value }))}
            required
            placeholder='Select Job Type'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.jobType?.join(', ')}</p>
          )}
          <SelectPair
            label='Job Location'
            description='Select the location of the job'
            name='jobLocation'
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
            required
            placeholder='Select Job Location'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.jobLocation?.join(', ')}</p>
          )}
          <SelectPair
            label='Salary Range'
            description='Select the salary range of the job'
            name='salaryRange'
            options={SALARY_RANGES.map((salary) => ({
              label: salary,
              value: salary,
            }))}
            required
            placeholder='Select Job Location'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-red-500'>{actionData.fieldErrors.salaryRange?.join(', ')}</p>
          )}
        </div>
        <Button type='submit' className='w-full max-w-sm mx-auto' size='lg'>
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
