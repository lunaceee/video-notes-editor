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

async function getVideoTitle(newUrl) {
	console.log('get video title');
	try {
		console.log('deploy prime url', process.env.DEPLOY_PRIME_URL);
		console.log('deploy BASE url', process.env.BASE_URL);
		console.log('deploy FOO url', process.env.VUE_APP_FOO);
		console.log('deploy BAR url', process.env.BAR);
		const response = await fetch(
			`https://refactor-name-css--cool-cuttle.netlify.app/.netlify/functions/getTitle?url=${newUrl}`
		);
		console.log({ response });
		const data = await response.text();
		console.log({ data });
		return data;
	} catch (e) {
		console.log(e);
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
		addVideo: (state, newUrl) => {
			console.log('mutation add video', newUrl);
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
			if (state.username !== null) {
				pushToServer(videos, state.username);
			}
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
		async addVideo(context, { newUrl }) {
			// call gettitle
			const videoTitle = await getVideoTitle(newUrl);
			console.log('we got title', videoTitle);
			context.commit('addVideo', newUrl);
			console.log({ context });
		}
	}
});

// Subscribe to store updates, each update serialize to localStorage.
store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});
