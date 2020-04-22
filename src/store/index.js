import Vue from "vue";
import Vuex from "vuex";
import youtube from "videojs-youtube";

"" + youtube; // hack for linter fixing
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    url: "https://www.youtube.com/watch?v=2LP3xyvkJEk",
    player: null,
    notes: Object.assign({}, localStorage),
  },
  getters: {
    url: (state) => state.url,
  },
  mutations: {
    updateUrl: (state, newUrl) => {
      console.log("updateurl", newUrl);
      state.url = newUrl;
    },
    updateNotes: (state, newNotes) => {
      console.log("updatenotes");
      localStorage[state.url] = newNotes.toString();

      state.notes[state.url] = newNotes.toString();
    },
  },
});
