import { Form } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import { SelectPair } from '~/common/components/ui/select-pair';
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from '../constants';
import type { Route } from './+types/submit';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Job | wemake' },
    { name: 'description', content: 'Submit a new job posting' },
  ];
};

export default function SubmitJob() {
  return (
    <div>
      <Hero title='Post a Job' subtitle='Reach out to the best talent in the industry' />
      <Form className='max-w-screen-2xl flex flex-col gap-10 items-center mx-auto'>
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
          <InputPair
            id='companyLogo'
            label='Company Logo URL'
            description='Image URL'
            name='companyLogo'
            type='url'
            required
            placeholder='i.e https://example.com/logo.png'
          />
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
          <InputPair
            id='applyUrl'
            label='Apply URL'
            description='URL'
            name='applyUrl'
            type='url'
            required
            placeholder='i.e https://example.com/apply'
          />
          <SelectPair
            label='Job Type'
            description='Select the type of job you are posting'
            name='jobType'
            options={JOB_TYPES.map((type) => ({ label: type.label, value: type.value }))}
            required
            placeholder='Select Job Type'
          />
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
        </div>
        <Button type='submit' className='w-full max-w-sm mx-auto' size='lg'>
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
