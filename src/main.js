import Vue from "vue";
import Vuex from "vuex";

import App from "./App.vue";
import router from "./router";
import "video.js/dist/video-js.css";
import '@devmobiliza/videojs-vimeo/dist/videojs-vimeo.esm';
import { store } from "./store";

export const bus = new Vue();

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    store.commit("initializeStore");
  },
}).$mount("#app");
