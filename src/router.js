import Vue from 'vue';
import VueRouter from 'vue-router';
import VideosList from '@/views/VideosList.vue';
import VideoDetails from '@/views/VideoDetails.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Feedback from '@/views/Feedback.vue';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',//remove trailing hash from url
	routes: [
		{
			path: '/',
			name: 'home',
			component: VideosList
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup
		},
		{
			path: '/feedback',
			name: 'feedback',
			component: Feedback
		},
		{
			path: '/:slug', //TODO: reformat the URL
			name: 'VideoDetails',
			component: VideoDetails
		},
		{
			path: '/save'
		}
	]
});
