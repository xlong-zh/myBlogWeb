const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const koaStatic = require('koa-static');
const app = new Koa();
const backendRouter = new Router();
const frontendRouter = new Router();
const { createBundleRenderer } = require('vue-server-renderer');

// 开放dist目录
const resolve = file => path.resolve(__dirname, file);
const templateHtml = fs.readFileSync(resolve('./src/index.temp.html'), 'utf-8');
const bundle = require(`./dist/vue-ssr-server-bundle.json`);
const clientManifest = require(`./dist/vue-ssr-client-manifest.json`);

// 第 2 步：获得一个createBundleRenderer
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: templateHtml,
  clientManifest: clientManifest
});

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        reject(err);
      } else {
        console.log('222222222222');
        resolve(html);
      }
    });
  });
}

// 后端Server
// 添加一个中间件来处理所有请求
backendRouter.get('*', async (ctx, next) => {
  const context = {
    title: 'ssr test',
    url: ctx.url
  };
  console.log('11111111111');
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context);
  console.log('html:', html);
  ctx.status = 200;
  ctx.type = 'text/html; charset=utf-8';
  ctx.body = html;
});
// app.use(koaStatic(resolve('./dist')));
app.use(koaStatic(path.resolve(__dirname, './dist')));

app.use(backendRouter.routes()).use(backendRouter.allowedMethods());

app.listen(3001, () => {
  console.log('服务器端渲染地址： http://localhost:3001');
});
