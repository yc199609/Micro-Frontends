import Vue from 'vue';
import antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import '@/styles/common/base.scss';
import './single-spa-config';

Vue.use(antd);
Vue.config.productionTip = false;

// 实现路由的持久化
let localRoutes = localStorage.getItem('permissions');
if (localRoutes) {
  localRoutes = JSON.parse(localRoutes);
  store.commit('SET_PERMISSIONS', localRoutes);

  localRoutes = localRoutes.map(item => ({ ...item, component: () => import('@/views/layout') }));
  localRoutes.push({ path: '*', redirect: '/404' });
  router.addRoutes(localRoutes);
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
