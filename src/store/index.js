import Vue from "vue";
import Vuex from "vuex";
import youtube from "videojs-youtube";

"" + youtube; // hack for linter fixing
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: { videos: [] },
  getters: {
    video: (state) => (url) => {
      for (const video of state.videos) {
        if (video.url === url) return video;
      }
    },
  },
  mutations: {
    initializeStore: function () {
      let persisted = localStorage.getItem("store");
      if (persisted) {
        persisted = JSON.parse(persisted) || {};
      } else {
        persisted = {};
      }

      if (!Array.isArray(persisted.videos)) {
        persisted.videos = [];
      }

      this.replaceState(persisted);
    },

    addVideo: (state, newUrl) => {
      const video = { url: newUrl, notes: [] };
      state.videos = state.videos || [];
      state.videos.push(video);
    },

    addNote: (state, video) => {
      video.notes.push({
        text: 'HELLO',
        time: 52,
      });
    },

    updateNotes: (state, payload) => {
      // let url = payload[0];
      // let newTimeStamp = payload[1];
      // let newNote = payload[2];
      console.log(payload);
    },

    editNote: (state, payload) => {
      // let note = payload[0];
      // let time = payload[1];
      // let url = payload[2];
      console.log(payload);
    },
  },
});

// Subscribe to store updates, each update serialize to localStorage.
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
