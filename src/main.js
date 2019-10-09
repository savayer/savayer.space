import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import VueMasonry from "vue-masonry-css";
import App from "./App.vue";
import routes from "./routes";

Vue.use(Router);
Vue.use(VueMasonry);
Vue.use(Meta);

const router = new Router({
  mode: "history",
  routes
});

new Vue({
  el: "#app",
  render: h => h(App),
  router
});
