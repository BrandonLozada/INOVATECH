import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: '/signup', component: () => import('pages/SignUp.vue') },
      { path: '/signin', component: () => import('pages/SignIn.vue') },
      { path: '/assistance-control', component: () => import('pages/FingerprintAttendance.vue') },

      // This will be show information about firebase or another thing
      { path: 'my-user/:id', component: () => import('pages/UserInformation.vue') },

      // The next path 'my-profile' will show all the components below (profile, data, addresses, cards, payment methods, etc.)
      { path: 'my-profile', component: () => import('pages/UserProfile.vue') },
      { path: 'my-data', component: () => import('pages/UserData.vue') },
      { path: 'my-addresses', component: () => import('pages/UserAddresses.vue') },

      {
        path: '/forms/',
        name: 'Forms',
        component: () => import('pages/PageForms.vue'),
        children: [
          {
            path: '/:catchAll(.*)*',
            component: () => import('pages/PageForms.vue'),
          },
        ],
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/error404',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/ErrorNotFound.vue')},
    ],
  },
];

export default routes;
