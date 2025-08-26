import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  index('common/pages/home.tsx'),
  ...prefix('/products', [
    index('features/products/pages/products.tsx'),
    ...prefix('/leaderboards', [
      layout('features/products/layouts/leaderboards-layout.tsx', [
        index('features/products/pages/leaderboards.tsx'),
        route('/yearly/:year', 'features/products/pages/yearly-leaderboards.tsx'),
        route('/monthly/:year/:month', 'features/products/pages/monthly-leaderboards.tsx'),
        route('/weekly/:year/:week', 'features/products/pages/weekly-leaderboards.tsx'),
        route('/daily/:year/:month/:day', 'features/products/pages/daily-leaderboards.tsx'),
        route('/:period', 'features/products/pages/leaderboards-redirection.tsx'),
      ]),
    ]),
    ...prefix('/categories', [
      index('features/products/pages/categories.tsx'),
      route('/:categoryId', 'features/products/pages/category.tsx'),
    ]),
    route('/search', 'features/products/pages/search.tsx'),
    route('/submit', 'features/products/pages/submit-product.tsx'),
    route('/promote', 'features/products/pages/promote.tsx'),
    ...prefix('/:productId', [
      index('features/products/pages/product-redirection.tsx'),
      layout('features/products/layouts/product-layout.tsx', [
        route('/overview', 'features/products/pages/overview.tsx'),
        index('features/products/pages/reviews.tsx'),
      ]),
    ]),
  ]),
  ...prefix('ideas', [
    index('features/ideas/pages/ideas.tsx'),
    route('/:ideaId', 'features/ideas/pages/idea.tsx'),
  ]),
  ...prefix('/jobs', [
    index('features/jobs/pages/jobs.tsx'),
    route('/:jobId', 'features/jobs/pages/job.tsx'),
    route('/submit', 'features/jobs/pages/submit.tsx'),
  ]),
  ...prefix('/auth', [
    layout('features/auth/layouts/auth-layout.tsx', [
      route('/login', 'features/auth/pages/login.tsx'),
      route('/join', 'features/auth/pages/join.tsx'),
      ...prefix('/otp', [
        route('/start', 'features/auth/pages/otp-start.tsx'),
        route('/complete', 'features/auth/pages/otp-complete.tsx'),
      ]),
      ...prefix('/social/:provider', [
        route('/start', 'features/auth/pages/social-start.tsx'),
        route('/complete', 'features/auth/pages/social-complete.tsx'),
      ]),
    ]),
  ]),
  ...prefix('community', [
    index('features/community/pages/community.tsx'),
    route('/:postId', 'features/community/pages/post.tsx'),
    route('/submit', 'features/community/pages/submit.tsx'),
  ]),
  ...prefix('/teams', [
    index('features/teams/pages/teams.tsx'),
    route('/:teamId', 'features/teams/pages/team.tsx'),
    route('/create', 'features/teams/pages/create.tsx'),
  ]),
  ...prefix('/my', [
    layout('features/users/layouts/dashboard-layout.tsx', [
      ...prefix('/dashboard', [
        index('features/users/pages/dashboard.tsx'),
        route('/:ideas', 'features/users/pages/dashboard-ideas.tsx'),
        route('/products/:productId', 'features/users/pages/dashboard-product.tsx'),
      ]),
    ]),
    route('/profile', 'features/users/pages/my-profile.tsx'),
    route('/settings', 'features/users/pages/settings.tsx'),
    route('/notifications', 'features/users/pages/notifications.tsx'),
    layout('features/users/layouts/messages-layout.tsx', [
      ...prefix('/messages', [
        index('features/users/pages/messages.tsx'),
        route('/:messageId', 'features/users/pages/message.tsx'),
      ]),
    ]),
  ]),
  layout('features/users/layouts/profile-layout.tsx', [
    ...prefix('/users/:username', [
      index('features/users/pages/profile.tsx'),
      route('/products', 'features/users/pages/profile-product.tsx'),
      route('/posts', 'features/users/pages/profile-post.tsx'),
      route('/ideas', 'features/users/pages/profile-idea.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
