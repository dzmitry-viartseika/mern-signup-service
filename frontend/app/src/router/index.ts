import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Page404 from '@/views/Page404.vue';

const token = localStorage.getItem('token');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/SignUp.vue'),
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "SignIn" */ '../views/SignIn.vue'),
  },
  {
    path: '/crm/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "Settings" */ '../views/Settings.vue'),
    beforeEnter: (to, from, next) => {
      if (token) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    },
  },
  // {
  //   path: '*',
  //   name: 'Page404',
  //   component: Page404,
  // },
  {
    path: '/crm/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (token) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "ForgotPassword" */ '../views/ForgotPassword.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
