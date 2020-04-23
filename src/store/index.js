import Vue from "vue";
import Vuex from "vuex";
import youtube from "videojs-youtube";

"" + youtube; // hack for linter fixing
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    url: "https://youtu.be/dy6D3QYnhSk",
    player: null,
    notes: Object.assign({}, localStorage), // instantiate notes as a copy of localStorage
  },
  getters: {
    url: (state) => state.url,
    notes: (state) => {
      console.log("notes getter");
      let result = {};
      Object.keys(state.notes).map((url) => {
        result[url] = state.notes[url].split(",").map(parseFloat);
      });
      console.log("result", result);
      return result;
    },
  },
  mutations: {
    updateUrl: (state, newUrl) => {
      state.url = newUrl;
      console.log("updated url", state.url);
    },
    updateNotes: (state, payload) => {
      let newNote = payload[1];
      console.log("newnote", newNote);
      const toArray = (key) => {
        if (!state.notes[key]) {
          return [];
        }
        return state.notes[key].split(",").map(parseFloat);
      };
      let myArray = toArray(state.url);
      myArray.push(newNote);
      console.log("notes array", myArray);

      localStorage[state.url] = myArray.toString();

      state.notes[state.url] = myArray.toString();
    },
  },
});
