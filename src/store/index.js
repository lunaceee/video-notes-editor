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
    initializeStore: function() {
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
      let videos = state.videos;
      videos = state.videos || [];

      // Check duplicated videos
      const getVideoId = (url) => {
        // YouTube url has two formats. one with "youtu.be" and one with "v" query
        if (url.match(/youtu\.be/)) {
          return url.split("youtu.be/")[1];
        }

        if (url.match(/v=/)) {
          return new URL(url).searchParams.get("v");
        }

        // TODO: Add check for other video formats, e.g., Vimeo
      };

      for (const vid of videos) {
        if (getVideoId(vid.url) === getVideoId(newUrl)) {
          alert("Video already exists");
          return;
        }
      }

      videos.push(video);
    },

    addNote: (state, { video, time, duration }) => {
      video.notes.unshift({
        text: "",
        time,
        duration,
      });
    },

    updateNote: (state, { note, text }) => {
      note.text = text;
    },

    deleteNote: (state, { video, noteIndex }) => {
      video.notes.splice(noteIndex, 1);
    },
  },
});

// Subscribe to store updates, each update serialize to localStorage.
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
