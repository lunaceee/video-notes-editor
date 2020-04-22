import Vue from "vue";
import Vuex from "vuex";
import youtube from "videojs-youtube";

"" + youtube; // hack for linter fixing
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
      console.log("updateurl", newUrl);
      state.url = newUrl;
    },
  },
});
