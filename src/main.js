import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "video.js/dist/video-js.css";
import { store } from "./store";

export const bus = new Vue();

Vue.config.productionTip = false;

new Vue({ router, store, render: (h) => h(App) }).$mount("#app");
