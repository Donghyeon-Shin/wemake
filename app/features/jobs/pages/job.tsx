import type { Route } from './+types/job';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Job Details | wemake' }, { name: 'description', content: 'Job Details' }];
};

export default function Job() {
  return <div></div>;
}
