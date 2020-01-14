const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, dir);
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463
   */
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  //基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: process.env.VUE_APP_CURRENTMODE === 'devtest' ? 'devtest' : 'dist',

  chainWebpack: config => {
    // config
    //   .entry('index')
    //   .add('babel-polyfill')
    //   .end();
    // 配置别名
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'));
  },

  // devServer: {
  //   port: 8088
  //   // proxy: {

  //   //   '/jeecg-boot': {
  //   //     target: 'http://127.0.0.1:8888', //请求本地 需要jeecg-boot后台项目
  //   //     // target: 'http://192.168.1.11:8888', //请求局域网 需要局域网后台
  //   //     // target: 'http://192.168.1.244:8888', //请求局域网 需要局域网后台(线上)
  //   //     ws: false,
  //   //     changeOrigin: true
  //   //     // pathRewrite: {
  //   //     //   '^/jeecg-boot': '/'  //默认所有请求都加了jeecg-boot前缀，需要去掉
  //   //     // }
  //   //   }
  //   // }
  // },

  lintOnSave: false
};
