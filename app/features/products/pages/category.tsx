import { useParams, type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Category | wemake' }];

export default function CategoryPage() {
  const { categoryId } = useParams();
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Category</h1>
      <p className='text-muted-foreground'>Category ID: {categoryId}</p>
    </div>
  );
}
