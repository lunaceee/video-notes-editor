import Vue from 'vue';
import VueRouter from 'vue-router';
import Videos from '@/views/Videos.vue';
import VideoDetails from '@/views/VideoDetails.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Feedback from '@/views/Feedback.vue';

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Videos
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
