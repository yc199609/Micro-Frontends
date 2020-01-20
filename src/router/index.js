import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  { path: '/404', component: () => import('@/views/404') },
  { path: '/', component: () => import('@/views/layout') },
  // {
  //   path: '/device',
  //   name: 'vue',
  //   component: () => import('@/views/layout'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

function storageToVuex() {
  store.commit('SET_NAME', localStorage.getItem('userName'));
  store.commit('SET_PERMISSIONS', JSON.parse(localStorage.getItem('permissions')));
}

router.beforeEach((to, from, next) => {
  if (store.state.user && store.state.user.name) {
    console.log('a');
    if (to.path === '/login') {
      console.log('b');
      next({ path: '/' });
    } else {
      console.log('c');
      next();
    }
  } else if (to.path === '/login') {
    console.log('d');
    next();
  } else if (localStorage.getItem('userName')) {
    console.log('e');
    storageToVuex();
    next();
  } else {
    console.log('f');
    next('/login');
  }
});

router.afterEach(() => {
  // ...
});

export default router;
