import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import './assets/scss/style.scss';
import './assets/iconfont/iconfont.css';

Vue.config.productionTip = false;

// import http from './http.js';
// Vue.prototype.$http = http;
import { dragPermission, focusPermission } from '@/utils/hasPermission';
import { postAction, putAction, getAction, deleteAction, httpAction } from '@/api/manage.js';
Vue.prototype.$http = { postAction, putAction, getAction, deleteAction, httpAction };

Vue.use(dragPermission);
Vue.use(focusPermission);

export function createApp() {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, App, router, store };
}

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app');
