export const JOB_TYPES = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Remote', value: 'remote' },
] as const;

export const LOCATION_TYPES = [
  { label: 'Remote', value: 'remote' },
  { label: 'In-person', value: 'in-person' },
  { label: 'Hybrid', value: 'hybrid' },
] as const;

export const SALARY_RANGES = [
  '$0 - $50,000',
  '$50,000 - $70,000',
  '$70,000 - $100,000',
  '$100,000 - $120,000',
  '$120,000 - $150,000',
  '$150,000 - $250,000',
  '$250,000+',
] as const;
