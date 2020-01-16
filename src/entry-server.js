import { createApp } from './main';

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, store, router } = createApp();
    // 设置服务器端 router 的位置
    router.push(context.url);

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      console.log(context.url);
      console.log(matchedComponents);
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      Promise.all(
        matchedComponents.map(component => {
          if (component.asyncData) {
            return component.asyncData({ store, route: router.currentRoute });
          }
        })
      )
        .then(() => {
          // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
          context.state = store.state;
          // 返回根组件
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
