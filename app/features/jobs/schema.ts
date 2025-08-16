import { bigint, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from './constants';

export const jobTypes = pgEnum(
  'job_types',
  JOB_TYPES.map((type) => type.value) as [string, ...string[]],
);

export const locationTypes = pgEnum(
  'location_types',
  LOCATION_TYPES.map((type) => type.value) as [string, ...string[]],
);

export const salaryRanges = pgEnum('salary_ranges', SALARY_RANGES);

export const jobs = pgTable('jobs', {
  job_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  position: text().notNull(),
  overview: text().notNull(),
  responsibilities: text().notNull(),
  qualifications: text().notNull(),
  benefits: text().notNull(),
  skills: text().notNull(),
  company_name: text().notNull(),
  company_logo_url: text().notNull(),
  company_location: text().notNull(),
  apply_url: text().notNull(),
  job_type: jobTypes().notNull(),
  location_type: locationTypes().notNull(),
  salary_range: salaryRanges().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
