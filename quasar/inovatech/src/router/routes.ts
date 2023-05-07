import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
    path: '/sign-in',
    component: () => import('layouts/SecondaryLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SignIn.vue') },
      // { path: '/:catchAll(.*)*', component: () => import('pages/SignIn.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Home
      { path: '', component: () => import('pages/HomePage.vue')},

      // Mis datos
      { path: 'my-user/:id', component: () => import('pages/UserInformation.vue') },
      { path: 'my-profile', component: () => import('pages/MyProfile.vue') },
      { path: 'my-address', component: () => import('pages/MyAddress.vue') },
      { path: 'my-employee-info', component: () => import('pages/MyEmployeeInfo.vue') },

      // Gestión
      { path: 'user-management', component: () => import('pages/UserManagement.vue') },
      { path: 'employee-list', component: () => import('pages/EmployeeList.vue') },
      { path: 'requests', component: () => import('pages/RequestManagement.vue') },


      // Visualización de un usuario
      { path: 'user-profile/:id', component: () => import('pages/UserProfile.vue'), props: true },

      // TODO: Crear la página (y remplazar el .vue) dónde se visualice el control de asistencia de los usuarios empleados.
      { path: '/assistance-control', component: () => import('pages/FingerprintAttendance.vue') },
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
