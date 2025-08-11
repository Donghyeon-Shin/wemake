import type { Route } from './+types/submit';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Job | wemake' },
    { name: 'description', content: 'Submit a new job posting' },
  ];
};

export default function SubmitJob() {
  return <div></div>;
}
