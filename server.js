const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const koaStatic = require('koa-static');
const app = new Koa();
const { createBundleRenderer } = require('vue-server-renderer');

// 开放dist目录
const resolve = file => path.resolve(__dirname, file);
app.use(koaStatic(resolve('./dist')));
let distPath = './dist';

const bundle = require(`${distPath}/vue-ssr-server-bundle.json`);
const clientManifest = require(`${distPath}/vue-ssr-client-manifest.json`);
// const templateHtml = fs.readFileSync(path.resolve(__dirname, './src/index.temp.html'), 'utf-8')
const templateHtml = fs.readFileSync(resolve('./src/index.temp.html'), 'utf-8');
// 第 2 步：获得一个createBundleRenderer

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: templateHtml,
  clientManifest: clientManifest
});

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}
// 第 3 步：添加一个中间件来处理所有请求
app.use(async (ctx, next) => {
  const context = {
    title: 'ssr test',
    url: ctx.url
  };
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context);
  ctx.status = 200;
  ctx.body = html;
});

const port = 3000;
app.listen(port, function() {
  console.log(`server started at localhost:${port}`);
});
