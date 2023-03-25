import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      // TODO: La página de la acción de crear cuenta es ejecutada por un administrador y pasaría a ser un formulario, procedimental.
      { path: '/signup', component: () => import('pages/SignUp.vue') },
      // TODO: Crear la página (y remplazar el .vue) dónde se visualice el control de asistencia de los usuarios empleados.
      { path: '/assistance-control', component: () => import('pages/FingerprintAttendance.vue') },

      // This will be show information about firebase or another thing
      { path: 'my-user/:id', component: () => import('pages/UserInformation.vue') },

      // The next path 'my-profile' will show all the components below (profile, data, addresses, cards, payment methods, etc.)
      { path: 'my-profile', component: () => import('pages/UserProfile.vue') },
      { path: 'my-data', component: () => import('pages/UserData.vue') },
      { path: 'my-addresses', component: () => import('pages/UserAddresses.vue') },

      // {
      //   path: '/forms/',
      //   name: 'Forms',
      //   component: () => import('pages/PageForms.vue'),
      //   children: [
      //     {
      //       path: '/:catchAll(.*)*',
      //       component: () => import('pages/PageForms.vue'),
      //     },
      //   ],
      // },
      // { path: '/:catchAll(.*)*', component: () => import('pages/IndexPage.vue') },
    ],
  },

  // TODO: Intentar crear la ruta dinamica '/forms/:formulario' para la siguiente ruta.
  // Formularios user, profile employee, address
  {
    path: '/forms',
    name: 'Forms',
    component: () => import('layouts/SecondaryLayout.vue'),
    children: [
      { path: '', name: 'Formulario', component: () => import('pages/PageForms.vue') },
      { path: '/', component: () => import('pages/PageForms.vue') },
      // TODO: Aquí poner el componente de gestión de usuarios o listado de empleados dependiendo del rol de usuario.
      { path: '/:catchAll(.*)*', component: () => import('pages/PageForms.vue') },
    ],
  },
  {
    path: '/signin',
    component: () => import('layouts/SecondaryLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SignIn.vue') },
      { path: '/:catchAll(.*)*', component: () => import('pages/SignIn.vue') },
    ],
  },
  {
    path: '/fingerprint-attendance',
    component: () => import('layouts/SecondaryLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FingerprintAttendance.vue') },
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
