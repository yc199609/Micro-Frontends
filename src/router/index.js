import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  { path: '/404', component: () => import('@/views/404') },
  {
    path: '/',
    name: '首页',
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/home'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

function storageToVuex() {
  store.commit('SET_NAME', localStorage.getItem('userName'));
}

router.beforeEach((to, from, next) => {
  if (store.state.user && store.state.user.name) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else if (to.path === '/login') {
    next();
  } else if (localStorage.getItem('userName')) {
    storageToVuex();
    next();
  } else {
    next('/login');
  }
});

router.afterEach(() => {
  // ...
});

export default router;
