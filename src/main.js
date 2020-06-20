/*
 * @Author: your name
 * @Date: 2020-04-28 16:28:58
 * @LastEditTime: 2020-06-20 17:18:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dyd-h5web\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import filters from './filters'; //将全部过滤器放在 filters/index.js 中便于管理
require('./components/index');
Vue.config.productionTip = false;

import { Button } from 'vant';
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole
// export default vConsole
Vue.use(Button)
// 事件总线
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})

// Element-ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);
const BASE_URL = 'http://live.deltamedical.cn'
const BASE_API_URL = 'http://live.api.deltamedical.cn/v1'
// const BASE_URL = 'http://dyd.web.kissneck.com.cn'
// const BASE_API_URL = 'http://dyd.api.kissneck.com.cn/v1'

Vue.prototype.$BASE_URL = BASE_URL
Vue.prototype.$BASE_API_URL = BASE_API_URL
import 'element-ui/lib/theme-chalk/index.css';

//api
import api from '@/api/api'
Vue.prototype.$api = api;

// 引入类型工具
import { viewDetail,status } from '@/utils/enum'
Vue.prototype.$viewDetail = viewDetail;
Vue.prototype.$liveStatus = status;

// 导入 css
import '@/common/css/normalize.css';
// import '@/common/css/iconfont.css';
import '@/common/css/common.css';
// import '@/common/css/aimee.css';
// import '@/common/li/iconfont.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
