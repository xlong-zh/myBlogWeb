import Vue from 'vue';
import Router from 'vue-router';
import Home from '@views/Home.vue';
import Info from '@views/Info.vue';
import Blog from '@views/Blog.vue';
import ArtDetail from '@views/ArtDetail.vue';

Vue.use(Router);
export function createRouter() {
  return new Router({
    mode: 'history', // 注意这里要使用history模式，因为hash不会发送到服务端
    // base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        // name: 'home',
        component: Home,
        redirect: '/home',
        children: [
          {
            path: '/home',
            name: 'info',
            component: Info
          },
          {
            path: 'blog',
            name: 'blog',
            component: Blog
          },
          {
            path: 'ArtDetail',
            name: 'ArtDetail',
            component: ArtDetail
          }
        ]
      }
    ]
  });
}
