import Vue from 'vue';
import Vuex from 'vuex';
import youtube from 'videojs-youtube';

'' + youtube; // hack for linter fixing
Vue.use(Vuex);

export const store = new Vuex.Store({
	state: { videos: [] },
	getters: {
		video: (state) => (url) => {
			for (const video of state.videos) {
				if (video.url === url) return video;
			}
		}
	},
	mutations: {
		initializeStore: function() {
			let persisted = localStorage.getItem('store');
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

		addNote: (state, { video, time, duration }) => {
			video.notes.unshift({
				text: '',
				time,
				duration
			});
		},

		updateNote: (state, { note, text }) => {
			note.text = text;
		},

		deleteNote: (state, { video, noteIndex }) => {
			video.notes.splice(noteIndex, 1);
		}
	}
});

// Subscribe to store updates, each update serialize to localStorage.
store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});
