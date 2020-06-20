import Vue from 'vue';
import Vuex from 'vuex';
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
Vue.use(Vuex)
// 统一管理接口域名
const state = {
    testNumB: 100,
}

const account = {
    namespaced: true,
    state: state,
    mutations: mutations,// -> commit('kim/login');
    actions: actions,// -> dispatch('kim/login');
    getters: getters,// -> getters['kim/isAdmin'];
}

export default account;
