import { Form, useParams } from 'react-router';
import { Hero } from '../../../common/components/layout/hero';
import ProductPagination from '../../../common/components/layout/product-pagination';
import { Button } from '../../../common/components/ui/button';
import { Input } from '../../../common/components/ui/input';
import { ProductCard } from '../components/product-card';
import type { Route } from './+types/category';

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Developer Tools | wemake` },
  { name: 'description', content: `Browse products in the Developer Tools category` },
];

export default function CategoryPage() {
  const { categoryId } = useParams();
  return (
    <div className='space-y-10'>
      <Hero title='Developer Tools' subtitle='Tools for developers to build products faster' />
      <Form className='flex justify-center max-w-screen-sm items-center mx-auto gap-2'>
        <Input name='query' placeholder='Search for products' className='text-lg' />
        <Button type='submit'>Search</Button>
      </Form>
      <div className='space-y-5 w-full max-w-screen-md mx-auto'>
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={index}
            to={`/products/${index}`}
            title={'Product Name'}
            description={'Product Description'}
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
