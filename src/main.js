// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Header from "./components/header"
import Slidebar from "./views/slidebar/slidebar"

Vue.use(ElementUI);
/* 引入公共样式 */
import "./assets/public.css"
import "./assets/icon/iconfont.css"
// axios 的全局默认配置
axios.defaults.baseURL = 'http:/127.0.0.1:5000/'; // 本地开发环境
/* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN */
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 10 * 1000;//超时

Vue.prototype.$http = axios;
// 注册全局组件
Vue.component("Header",Header)
Vue.component("Slidebar",Slidebar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
