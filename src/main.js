import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import Axios from './api/axios';
import Axios from 'axios';
import { http } from './api/HttpUtils';
import promise from 'es6-promise';
import './style/common.less';
import store from './store/store';

require('./mock.js');
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;
Vue.prototype.$http = http;
promise.polyfill();
Vue.use(iView);

Vue.prototype.BaseConfig = 'http://localhost:8082';

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
