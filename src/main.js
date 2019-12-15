import Vue from "vue";
import Meta from "vue-meta";
import VueMasonry from "vue-masonry-css";
import App from "./App.vue";
import router from "./router";

Vue.use(VueMasonry);
Vue.use(Meta);

new Vue({
  el: "#app",
  render: h => h(App),
  router
});
