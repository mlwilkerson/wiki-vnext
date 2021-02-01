
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'n/:editor?', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/a',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', redirect: 'dashboard' },
      { path: 'dashboard', component: () => import('pages/admin/admin-dashboard.vue') },
      { path: 'sites', component: () => import('pages/admin/admin-sites.vue') },
      { path: 'general', component: () => import('pages/admin/admin-general.vue') },
      { path: 'locale', component: () => import('pages/admin/admin-locale.vue') },
      { path: 'navigation', component: () => import('pages/admin/admin-navigation.vue') },
      // { path: 'pages', component: () => import('pages/admin/admin-pages.vue') },
      // { path: 'pages/:id(\\d+)', component: () => import('pages/admin/admin-pages-edit.vue') },
      // { path: 'pages/visualize', component: () => import('pages/admin/admin-pages-visualize.vue') },
      // { path: 'tags', component: () => import('pages/admin/admin-tags.vue') },
      { path: 'theme', component: () => import('pages/admin/admin-theme.vue') },
      { path: 'groups', component: () => import('pages/admin/admin-groups.vue') },
      // { path: 'groups/:id(\\d+)', component: () => import('pages/admin/admin-groups-edit.vue') },
      // { path: 'users', component: () => import('pages/admin/admin-users.vue') },
      // { path: 'users/:id(\\d+)', component: () => import('pages/admin/admin-users-edit.vue') },
      // { path: 'analytics', component: () => import('pages/admin/admin-analytics.vue') },
      // { path: 'auth', component: () => import('pages/admin/admin-auth.vue') },
      // { path: 'comments', component: () => import('pages/admin/admin-comments.vue') },
      // { path: 'rendering', component: () => import('pages/admin/admin-rendering.vue') },
      // { path: 'editor', component: () => import('pages/admin/admin-editor.vue') },
      // { path: 'extensions', component: () => import('pages/admin/admin-extensions.vue') },
      // { path: 'logging', component: () => import('pages/admin/admin-logging.vue') },
      // { path: 'search', component: () => import('pages/admin/admin-search.vue') },
      // { path: 'storage', component: () => import('pages/admin/admin-storage.vue') },
      // { path: 'api', component: () => import('pages/admin/admin-api.vue') },
      // { path: 'mail', component: () => import('pages/admin/admin-mail.vue') },
      // { path: 'security', component: () => import('pages/admin/admin-security.vue') },
      // { path: 'ssl', component: () => import('pages/admin/admin-ssl.vue') },
      { path: 'system', component: () => import('pages/admin/admin-system.vue') }
      // { path: 'utilities', component: () => import('pages/admin/admin-utilities.vue') },
      // { path: 'webhooks', component: () => import('pages/admin/admin-webhooks.vue') },
      // { path: 'dev-flags', component: () => import('pages/admin/admin-dev-flags.vue') },
      // { path: 'contribute', component: () => import('pages/admin/admin-contribute.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
