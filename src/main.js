import Vue from 'vue';
import Vuex from 'vuex';
import 'normalize.css';
import VueFirestore from 'vue-firestore';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import 'video.js/dist/video-js.css';
import { store } from './store';

console.log('firebase', firebase);
const firebaseConfig = {
	apiKey: 'AIzaSyATsmletLhA5xNmzGHMLtj6UgupDvL0U4M',
	authDomain: 'video-annotator-5a438.firebaseapp.com',
	databaseURL: 'https://video-annotator-5a438.firebaseio.com',
	projectId: 'video-annotator-5a438',
	storageBucket: 'video-annotator-5a438.appspot.com',
	messagingSenderId: '798874475731',
	appId: '1:798874475731:web:181aa5334e94053dc30826',
	measurementId: 'G-23MMSMGR0X'
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false; // turns off the 'You are running Vue in development mode.' msg

Vue.use(Vuex);

export const bus = new Vue();

Vue.use(VueFirestore);

new Vue({
	router,
	store,
	render: (h) => h(App),
	beforeCreate() {
		store.commit('initializeStore');
	}
}).$mount('#app');
