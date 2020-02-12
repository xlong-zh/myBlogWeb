const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const koaMount = require('koa-mount');

const resolve = file => path.resolve(__dirname, file);
const app = new Koa();

const isDev = process.env.NODE_ENV !== 'production';
const router = require('./ssr');

app.use(router.routes()).use(router.allowedMethods());
// 开放目录
app.use(koaMount('/dist', koaStatic(resolve('../dist'))));
app.use(koaMount('/public', koaStatic(resolve('../public'))));

app.listen(3000, () => {
  console.log('服务器端渲染地址： http://localhost:3000');
});
module.exports = app;
