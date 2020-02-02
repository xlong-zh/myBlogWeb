const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const send = require('koa-send');
const router = new Router();

const resolve = file => path.resolve(__dirname, file);

// 获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require(`../dist/vue-ssr-server-bundle.json`);
const clientManifest = require(`../dist/vue-ssr-client-manifest.json`);
const templateHtml = fs.readFileSync(resolve('../src/index.temp.html'), 'utf-8');

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
        resolve(html);
      }
    });
  });
}

// 添加一个中间件来处理所有请求
router.get('*', async (ctx, next) => {
  const url = ctx.url;
  if (url.includes('.')) {
    console.log(`proxy ${url}`);
    return await send(ctx, url, { root: path.resolve(__dirname, '../dist') });
  }
  ctx.res.setHeader('Content-Type', 'text/html');
  const context = {
    title: 'ssr test',
    url
  };
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context);
  // console.log('html:', html);
  ctx.body = html;
});
module.exports = router;
