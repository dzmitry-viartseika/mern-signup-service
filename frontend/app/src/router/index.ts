import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const token = localStorage.getItem('token');
import store from '../store/index';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
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
      if (store.getters.user) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    },
  },
  {
    path: '*',
    name: 'Page404',
    component: () => import(/* webpackChunkName: "Page404" */ '../views/Page404.vue'),
  },
  {
    path: '/',
    name: 'LandingPage',
    component: () => import(/* webpackChunkName: "Landing" */ '../views/LandingPage.vue'),
  },
  {
    path: '/crm/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    },
  },
  {
    path: '/crm/analytics',
    name: 'Analytics',
    component: () => import(/* webpackChunkName: "Analytics" */ '../views/Analytics.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    },
  },
  {
    path: '/crm/notifications',
    name: 'Notification',
    component: () => import(/* webpackChunkName: "Notification" */ '../views/Notification.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    },
  },
  {
    path: '/crm/others',
    name: 'Others',
    component: () => import(/* webpackChunkName: "Others" */ '../views/Others.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    },
  },
  {
    path: '/crm/files',
    name: 'Files',
    component: () => import(/* webpackChunkName: "Others" */ '../views/Files.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    },
  },
  {
    path: '/crm/others/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "Test" */ '../views/Test.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    },
  },
  {
    path: '/crm/calendar-working-days',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "Calendar" */ '../views/Calendar.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
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
    path: '/terms',
    name: 'Terms',
    component: () => import(/* webpackChunkName: "Terms" */ '../views/Terms.vue'),
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import(/* webpackChunkName: "Privacy" */ '../views/Privacy.vue'),
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
