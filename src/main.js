import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import VueMasonry from "vue-masonry-css";
import App from "./App.vue";
import Home from "./components/Home.vue";
import Post from "./components/Post.vue";
import Posts from "./components/Posts.vue";

Vue.use(Router);
Vue.use(VueMasonry);
Vue.use(Meta);

const routes = [
  { path: "/", component: Home },
  { path: "/posts/:slug", component: Post, props: true, name: "single-post" },
  { path: "/posts", component: Posts }
];

const router = new Router({
  mode: "history",
  routes
});

new Vue({
  el: "#app",
  render: h => h(App),
  router
});
