/*
 * @Author: your name
 * @Date: 2020-06-20 16:57:51
 * @LastEditTime: 2020-06-20 19:06:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dyd\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import kim from "./kim/store";
// import account from "./account/store";
Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  modules: {
    main: {
      namespaced: true,
      modules: {
        kim: kim
      }
    }
  }
});
export default store;
