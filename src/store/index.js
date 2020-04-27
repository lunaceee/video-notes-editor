import Vue from "vue";
import Vuex from "vuex";
import youtube from "videojs-youtube";

"" + youtube; // hack for linter fixing
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    rawNotes: Object.assign({}, localStorage), // instantiate notes as a copy of localStorage
  },
  getters: {
    notes: (state) => {
      let result = {};
      delete state.rawNotes["loglevel:webpack-dev-server"]; // remove unuseful key value pairs from local storage

      Object.keys(state.rawNotes).map((url) => {
        console.log("notes getter");
        result[url] = JSON.parse(state.rawNotes[url]);
      });

      return result;
    },
    getNote: (state) => (url) => {
      console.log("getNote getter");
      return JSON.parse(state.rawNotes[url]);
    },
  },
  mutations: {
    updateUrl: (state, newUrl) => {
      let myObj = state.rawNotes[newUrl] ? state.rawNotes[newUrl] : "{}";
      localStorage[newUrl] = myObj;
      state.rawNotes = localStorage; // Mutate the entire rawNotes obj so that watcher in VideoPlayerAndNotes works
      console.log("updated url", newUrl);
    },
    updateNotes: (state, payload) => {
      let url = payload[0];
      let newNote = payload[1];
      console.log("newnote", newNote);
      const toObj = (key) => {
        if (!state.rawNotes[key]) {
          return {};
        }
        const newObj = JSON.parse(state.rawNotes[key]);
        console.log("new obj", newObj);
        return newObj;
      };
      let myObj = toObj(url);

      myObj[newNote] = newNote;

      localStorage[url] = JSON.stringify(myObj);

      // create a brand new object and copy localStorage into the object, rebind rawNotes to the new object
      state.rawNotes = Object.assign({}, localStorage);
    },
  },
});
