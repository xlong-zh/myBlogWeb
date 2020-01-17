import Vue from 'vue';
import Router from 'vue-router';
import Home from '@views/Home.vue';

Vue.use(Router);
export function createRouter() {
  return new Router({
    mode: 'history', // 注意这里要使用history模式，因为hash不会发送到服务端
    // base: process.env.BASE_URL,
    routes: [
      {
        path: '/bar',
        name: 'bar',
        component: () => import('@views/Bar.vue')
      },
      {
        path: '/foo',
        name: 'foo',
        component: () => import('@views/Foo.vue')
      },
      {
        path: '/',
        // name: 'home',
        component: Home,
        children: [
          {
            path: '/',
            name: 'info',
            component: () => import('@views/Info.vue')
          },
          {
            path: 'blog',
            name: 'blog',
            component: () => import('@views/Blog.vue')
          }
        ]
      }
    ]
  });
}
