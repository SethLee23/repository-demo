import Vue from 'vue';
import Vuex from 'vuex';
import getters from "./getters";
import kim from "./kim/store";
import account from "./account/store";
Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  modules: {
    main: {
      namespaced: true,
      modules: {
        kim: kim,
         account: account
      }
    }

  }
})
export default store



