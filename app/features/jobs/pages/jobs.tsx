import { useSearchParams } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { JobCard } from '~/features/jobs/components/job-card';
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from '../constants';
import type { Route } from './+types/jobs';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Jobs | wemake' },
    { name: 'description', content: 'Find your dream job at wemake' },
  ];
};

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Hero title='Jobs' subtitle='Companies looking for makers' />
      <div className='grid grid-cols-6 gap-20 items-start'>
        <div className='grid grid-cols-3 col-span-4 gap-5'>
          {Array.from({ length: 11 }).map((_, index) => (
            <JobCard
              key={index}
              id={`jobId-${index}`}
              company='Tesla'
              companyLogoUrl='https://github.com/teslamotors.png'
              companyHq='San Francisco, CA'
              title='Senior Software Engineer'
              postedAt='12 hours ago'
              type='Full-time'
              positionLocation='Remote'
              salary='$100,000 - $120,000'
            />
          ))}
        </div>
        <div className='col-span-2 flex flex-col gap-10'>
          <div className='flex flex-col items-start gap-2.5'>
            <h4 className='text-sm text-muted-foreground font-bold'>Type</h4>
            <div className='flex flex-wrap gap-2'>
              {JOB_TYPES.map((type) => (
                <Button
                  key={type.value}
                  onClick={() => onFilterClick('type', type.value)}
                  variant={searchParams.get('type') === type.value ? 'secondary' : 'outline'}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className='flex flex-col items-start gap-2.5'>
            <h4 className='text-sm text-muted-foreground font-bold'>Location</h4>
            <div className='flex flex-wrap gap-2'>
              {LOCATION_TYPES.map((type) => (
                <Button
                  key={type.value}
                  variant={searchParams.get('location') === type.value ? 'secondary' : 'outline'}
                  onClick={() => onFilterClick('location', type.value)}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className='flex flex-col items-start gap-2.5'>
            <h4 className='text-sm text-muted-foreground font-bold'>Salary</h4>
            <div className='flex flex-wrap gap-2'>
              {SALARY_RANGES.map((range) => (
                <Button
                  key={range}
                  variant={searchParams.get('salary') === range ? 'secondary' : 'outline'}
                  onClick={() => onFilterClick('salary', range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
