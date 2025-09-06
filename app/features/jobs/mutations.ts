import type { SupabaseClient } from '@supabase/supabase-js';
import z from 'zod';
import type { Database } from '~/supa-client';
import type { FormSchema } from './pages/submit';

export const createJob = async (
  client: SupabaseClient<Database>,
  data: z.infer<typeof FormSchema>,
) => {
  const { data: jobData, error } = await client
    .from('jobs')
    .insert({
      position: data.position,
      overview: data.overview,
      responsibilities: data.responsibilities,
      qualifications: data.qualifications,
      benefits: data.benefits,
      skills: data.skills,
      company_name: data.company,
      company_logo_url: data.companyLogo,
      company_location: data.location,
      apply_url: data.applyUrl,
      job_type: data.jobType,
      location_type: data.jobLocation,
      salary_range: data.salaryRange,
    })
    .select()
    .single();
  if (error) throw error;
  return jobData;
};
