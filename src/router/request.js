import axios from 'axios';
import Vue from 'vue';
const http = axios.create({
  baseURL: 'http://localhost:4000/web/api'
});
http.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.params = {
        _t: new Date().getTime(),
        ...config.params
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (res.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      });
      // if (err.response.status === 404) {
      //   router.push("/404");
      // }
    }
  }
);
export default http;
