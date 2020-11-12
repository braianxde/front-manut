import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: ""
  },
  mutations: {
    changeTest: (state, data) => {
      state.test = data;
    }
  },
  getters: {
    getTest: state => {
      return state.test;
    },
  },
  actions: {
    changeTest: ({commit}, value) => {
      commit('changeTest', value);
    },
  },
});
