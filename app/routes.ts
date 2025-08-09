import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
  index('common/pages/home.tsx'),
  ...prefix('/products', [
    index('features/products/pages/products.tsx'),
    ...prefix('/leaderboards', [
      index('features/products/pages/leaderboards.tsx'),
      route('/yearly/:year', 'features/products/pages/yearly-leaderboards.tsx'),
      route('/monthly/:year/:month', 'features/products/pages/monthly-leaderboards.tsx'),
      route('/weekly/:year/:month/:week', 'features/products/pages/weekly-leaderboards.tsx'),
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
  ]),
] satisfies RouteConfig;
