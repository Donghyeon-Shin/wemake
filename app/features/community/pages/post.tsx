import type { Route } from './+types/post';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Post | wemake' }];
};

export default function Post() {
  return <div></div>;
}
