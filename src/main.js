import Vue from 'vue';
import Vuex from 'vuex';
import '@/assets/css/main.css';
import VueFirestore from 'vue-firestore';
import App from '@/App.vue';
import router from '@/router';
import 'video.js/dist/video-js.css';
import { store } from '@/store';
import globalDirectives from './plugins/globalDirectives';
import globalComponents from "./plugins/globalComponents";


Vue.config.productionTip = false; // turns off the 'You are running Vue in development mode.' msg

Vue.use(Vuex);
Vue.use(VueFirestore);
Vue.use(globalDirectives);
Vue.use(globalComponents);
export const bus = new Vue();

new Vue({
	router,
	store,
	render: (h) => h(App),
	beforeCreate() {
		store.commit('initializeStore');
	}
}).$mount('#app');
