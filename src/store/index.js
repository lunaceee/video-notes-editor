import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    url: null,
    player: null,
  },
  getters: {
    url: (state) => state.url,
  },
  mutations: {
    updateUrl: (state, newUrl) => {
      console.log("updateurl");
      state.url = newUrl;
    },
  },
});
