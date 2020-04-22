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
    notes: (state) => {
      console.log("notes getter");
      let result = {};
      Object.keys(state.notes).map((url) => {
        result[url] = state.notes[url].split(",").map(parseFloat);
      });
      return result;
    },
  },
  mutations: {
    updateUrl: (state, newUrl) => {
      console.log("updateurl", newUrl);
      state.url = newUrl;
    },
    updateNotes: (state, payload) => {
      let url = payload[0];
      let newNote = payload[1];
      console.log("updatenotes", url, newNote);
      const toArray = (key) => {
        if (!state.notes[key]) {
          return [];
        }
        return state.notes[key].split(",").map(parseFloat);
      };
      let myArray = toArray(state.url);
      myArray.push(newNote);

      localStorage[state.url] = myArray.toString();

      state.notes[state.url] = myArray.toString();
    },
  },
});
