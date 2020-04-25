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
      let result = {};
      delete state.notes["loglevel:webpack-dev-server"]; // remove unuseful key value pairs from local storage

      Object.keys(state.notes).map((url) => {
        console.log("notes getter", state.notes[url]);
        result[url] = JSON.parse(state.notes[url]);
        console.log(result);
      });

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
      const toObj = (key) => {
        if (!state.notes[key]) {
          return {};
        }
        const newObj = JSON.parse(state.notes[key]);
        console.log("new obj", newObj);
        return newObj;
      };
      let myObj = toObj(state.url);

      myObj[newNote] = newNote;

      localStorage[state.url] = JSON.stringify(myObj);

      state.notes[state.url] = JSON.stringify(myObj);

      // console.log(localStorage[state.url]);
    },
  },
});
