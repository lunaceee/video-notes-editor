import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: `/:slug`, //TODO: reformat the URL
      name: "VideoDetails",
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited
      component: () =>
        import(/* webpackChunkName:"videoPlayer" */ "./views/VideoDetails"),
    },
  ],
});
