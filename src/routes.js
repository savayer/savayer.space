import Home from "./components/Home.vue";
import Post from "./components/Post.vue";
import Posts from "./components/Posts.vue";
import Works from "./components/Works.vue";
import Work from "./components/Work.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/posts/:slug", component: Post, props: true, name: "single-post" },
    { path: "/posts", component: Posts },
    { path: "/portfolio", component: Works },
    { path: "/portfolio/:slug", component: Work, props: true, name: "single-work" },
];

export default routes;