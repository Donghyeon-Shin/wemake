import client from '../../supa-client';
import type { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from './constants';

export const getJobs = async ({
  limit,
  type,
  location,
  salary,
}: {
  limit: number;
  type?: (typeof JOB_TYPES)[number]['value'];
  location?: (typeof LOCATION_TYPES)[number]['value'];
  salary?: (typeof SALARY_RANGES)[number];
}) => {
  const baseQuery = client
    .from('jobs')
    .select(
      'job_id, position, overview, company_name, company_logo_url, company_location, job_type, location_type, salary_range, created_at',
    )
    .limit(limit);

  if (type) {
    baseQuery.eq('job_type', type);
  }

  if (location) {
    baseQuery.eq('location_type', location);
  }

  if (salary) {
    baseQuery.eq('salary_range', salary);
  }

  const { data, error } = await baseQuery;
  if (error) throw error;
  return data;
};
