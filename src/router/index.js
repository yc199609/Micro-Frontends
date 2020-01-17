import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  { path: '/404', component: () => import('@/views/404') },
  { path: '/', component: () => import('@/views/layout') },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.addRoutes([]);

router.beforeEach((to, from, next) => {
  if (store.state.user && store.state.user.name) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else if (to.path === '/login') {
    next();
  } else {
    next('/login');
  }
});

router.afterEach(() => {
  // ...
});

export default router;
