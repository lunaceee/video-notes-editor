import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

Vue.use(Vuex);
Vue.config.productionTip = false;

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
