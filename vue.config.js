const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals'); //忽略node_modules文件夹中的所有模块
// const merge = require('lodash.merge');
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const target = TARGET_NODE ? 'server' : 'client'; //根据环境变量来指向入口
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, dir);
}

// vue.config.js
module.exports = {
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  // productionSourceMap: false,
  //基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: true
  },
  configureWebpack: () => ({
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${target}.js`,
    // 需要开启source-map文件映射，因为服务器端在渲染时，
    // 会通过Bundle中的map文件映射关系进行文件的查询
    devtool: 'source-map',
    // 服务器端在Node环境中运行，需要打包为类Node.js环境可用包（使用Node.js require加载chunk）
    // 客户端在浏览器中运行，需要打包为类浏览器环境里可用包
    target: TARGET_NODE ? 'node' : 'web',
    // 关闭对node变量、模块的polyfill
    node: TARGET_NODE ? undefined : false,
    output: {
      // 配置模块的暴露方式，服务器端采用module.exports的方式，客户端采用默认的var变量方式
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    // 外置化应用程序依赖模块。可以使服务器构建速度更快
    externals: TARGET_NODE
      ? nodeExternals({
          // 不要外置化 webpack 需要处理的依赖模块。
          // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
          // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
          whitelist: [/\.css$/]
        })
      : undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    },
    // 根据之前配置的环境变量判断打包为客户端/服务器端Bundle
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),

  chainWebpack: config => {
    // 关闭vue-loader中默认的服务器端渲染函数
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        // merge(options, {
        //   optimizeSSR: false
        // });
        options.optimizeSSR = false;
        return options;
      });
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .tap(options => {
    //     options = {
    //       limit: 1024,
    //       fallback: 'file-loader?name=img/[path][name].[ext]'
    //     };
    //     return options;
    //   });
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
