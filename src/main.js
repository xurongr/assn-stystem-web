import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import Axios from './api/axios';
import Axios from 'axios';
import { http } from './api/HttpUtils';
import promise from 'es6-promise';

require('./mock.js');
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;
Vue.prototype.$http = http;
promise.polyfill();
Vue.use(iView);

Vue.prototype.BaseConfig = 'http://localhost:8082';

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
