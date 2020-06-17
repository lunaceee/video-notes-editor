import Vue from 'vue';
import Vuex from 'vuex';
import youtube from 'videojs-youtube';
import { getVideoId } from '../utils';
import { db } from '../firebase';

'' + youtube; // hack for linter fixing
Vue.use(Vuex);

function pushToServer(videos, username) {
	db.collection('users').doc(username).update({ videos: videos });
}

export const store = new Vuex.Store({
	state: { videos: [], username: null },
	getters: {
		video: (state) => (url) => {
			console.log(state);
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
		setUsername: (state, newUsername) => {
			state.username = newUsername;
		},
		unsetUsername: (state) => {
			state.username = null;
		},
		addVideo: (state, newUrl) => {
			const videoId = getVideoId(newUrl);
			const video = { url: newUrl, notes: [], videoId };
			let videos = state.videos || [];

			for (const vid of videos) {
				if (getVideoId(vid.url) === videoId) {
					alert('Video already exists');
					return;
				}
			}

			videos.push(video);
			pushToServer(videos, state.username);
		},
		updateVideos: (state, newVideos) => {
			console.log(state.username);
			state.videos = [ ...state.videos, ...newVideos ];
			pushToServer(state.videos, state.username);
		},
		deleteVideo: (state, videoId) => {
			let videos = state.videos;
			const videoIndex = videos.findIndex((video) => video.videoId === videoId);
			if (videoIndex === -1) return;
			videos.splice(videoIndex, 1);
			pushToServer(videos, state.username);
		},
		deleteAllVideos: (state) => {
			state.videos = [];
		},
		addNote: (state, { video, time, duration }) => {
			video.notes.unshift({
				text: '',
				time,
				duration
			});
			pushToServer(state.videos, state.username);
		},

		updateNote: (state, { note, text }) => {
			note.text = text;
			pushToServer(state.videos, state.username);
		},

		deleteNote: (state, { video, noteIndex }) => {
			video.notes.splice(noteIndex, 1);
			pushToServer(state.videos, state.username);
		}
	}
});

// Subscribe to store updates, each update serialize to localStorage.
store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});
