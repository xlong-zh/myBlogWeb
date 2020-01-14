import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/style.scss';
import './assets/iconfont/iconfont.css';

Vue.config.productionTip = false;

import http from './http.js';
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
