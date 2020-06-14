import Vue from 'vue';
import Vuex from 'vuex';
import 'normalize.css';
import VueFirestore from 'vue-firestore';
import App from './App.vue';
import router from './router';
import 'video.js/dist/video-js.css';
import { store } from './store';
import VModal from 'vue-js-modal';

Vue.config.productionTip = false; // turns off the 'You are running Vue in development mode.' msg

Vue.use(Vuex);
Vue.use(VModal);

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
