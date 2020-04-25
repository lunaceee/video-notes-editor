import Vue from "vue";
import App from "./App.vue";
import "video.js/dist/video-js.css";
import { store } from "./store";

export const bus = new Vue();

Vue.config.productionTip = false;

new Vue({ store, render: (h) => h(App) }).$mount("#app");
