/*
 * @Author: your name
 * @Date: 2020-04-28 16:29:01
 * @LastEditTime: 2020-06-20 17:33:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dyd-h5web\src\store\kim\store.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
Vue.use(Vuex)
// 统一管理接口域名
const state = {
    testNum: 0,
}

const kim = {
    namespaced: true,
    state: state,
    mutations: mutations,// -> commit('kim/login');
    actions: actions,// -> dispatch('kim/login');
    getters: getters,// -> getters['kim/isAdmin'];
}

export default kim;
