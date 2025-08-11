import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  index('common/pages/home.tsx'),
  ...prefix('/products', [
    index('features/products/pages/products.tsx'),
    ...prefix('/leaderboards', [
      index('features/products/pages/leaderboards.tsx'),
      route('/yearly/:year', 'features/products/pages/yearly-leaderboards.tsx'),
      route('/monthly/:year/:month', 'features/products/pages/monthly-leaderboards.tsx'),
      route('/weekly/:year/:week', 'features/products/pages/weekly-leaderboards.tsx'),
      route('/daily/:year/:month/:day', 'features/products/pages/daily-leaderboards.tsx'),
      route('/:period', 'features/products/pages/leaderboards-redirection.tsx'),
    ]),
    ...prefix('/categories', [
      index('features/products/pages/categories.tsx'),
      route('/:categoryId', 'features/products/pages/category.tsx'),
    ]),
    route('/search', 'features/products/pages/search.tsx'),
    route('/submit', 'features/products/pages/submit.tsx'),
    route('/promote', 'features/products/pages/promote.tsx'),
    ...prefix('/:productId', [
      index('features/products/pages/product-redirection.tsx'),
      layout('features/products/layouts/product-layout.tsx', [
        route('/overview', 'features/products/pages/overview.tsx'),
        ...prefix('/reviews', [
          index('features/products/pages/reviews.tsx'),
          route('/new', 'features/products/pages/new-review.tsx'),
        ]),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
