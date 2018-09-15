import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Post from './components/Post.vue'
import Posts from './components/Posts.vue'

Vue.use(Router)
Vue.use(BootstrapVue)

const routes = [
  { path: '/', component: Home },
  { path: '/posts/first-try-create-spa', component: Post },
  { path: '/posts', component: Posts },
];

const router = new Router({
 routes
})

new Vue({
 el: '#app',
 render: h => h(App),
 router
})