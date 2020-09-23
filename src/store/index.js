import Vue from 'vue';
import Vuex from 'vuex';
import youtube from 'videojs-youtube';
import { getVideoId } from '../utils';
import { db } from '../firebase';

'' + youtube; // hack for linter fixing
Vue.use(Vuex);

//Todo: change it to async function
function pushToServer(videos, username) {
	if (username !== null) {
		db.collection('users').doc(username).update({ videos: videos });
	}
}

async function getVideoTitle(newUrl) {
	//const lambda_dev = 'http://localhost:8888/';
	const build_env = process.env.BASE_URL;
	try {
		const response = await fetch(`${build_env}/.netlify/functions/getTitle?url=${newUrl}`);
		const data = await response.text();
		return data;
	} catch (e) {
		console.log(e);
		// Return empty string if there's an error
		return '';
	}
}

export const store = new Vuex.Store({
	state: { videos: [], username: null },
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
				persisted.username = null;
			}

			this.replaceState(persisted);
		},
		setUsername: (state, newUsername) => {
			state.username = newUsername;
		},
		unsetUsername: (state) => {
			state.username = null;
		},
		addVideo: (state, { newUrl, videoTitle }) => {
			const videoId = getVideoId(newUrl);
			const video = { url: newUrl, notes: [], videoId, videoTitle };
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
	},
	actions: {
		async addVideo({ commit }, { newUrl }) {
			const videoTitle = await getVideoTitle(newUrl);
			commit('addVideo', { newUrl, videoTitle });
		}
	}
});

// Subscribe to store updates, each update serialize to localStorage.
store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});
