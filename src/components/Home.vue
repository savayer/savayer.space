<template>
  <div class="wrapper reverse">
    <div class="background-slides"></div> 
    <div :class="isOverlaySkew">
      <div class="overlay__stars"></div>
    </div>
    <span v-if="!show" class="icon-menu custom-icon-menu" @click="show = !show"></span>
    <span v-else class="icon-cancel-circle close" @click="show = !show"></span>
    <section id="block-left">
      <div class="content">
        <h1>WEB JOURNAL</h1>        
      </div>
      
    </section>
    <transition name="slide">
      <section v-if="show" class="sidebar">
        <header>          
          <h3>Добро пожаловать!</h3>
          <p>
            Если вы это читаете, значит вы перешли на мой сайт с моего круга или hh, тогда я должен вам сказать, что я открыт для предложений и оставить свои контактные данные для связи и примеры работ.
          </p>
          <div class="social social--sidebar content-center">
            <a href="http://t.me/savayer">
              <span class="icon-telegram"></span>
            </a>
            <a href="skype:savayer">
              <span class="icon-skype"></span>
            </a>
            <a href="https://github.com/savayer">
              <span class="icon-github"></span>
            </a>
          </div>
          <p>
            Или вы мой товарищ, с которым я поделился ссылкой, иначе вы - странник, случайно забредший в дебри сети.
          </p>      
          <h3>Последние посты</h3>
        </header>
        
        <div class="posts">
          <div class="post" v-for="post in posts" :key="post.id">
            <router-link :to="`/posts/${post.id}-${post.attributes.slug}`">
              <img :src="post.attributes.image" :alt="post.attributes.postTitle">
            </router-link>
            <router-link :to="`/posts/${post.id}-${post.attributes.slug}`" class="pagetitle">
              {{ post.attributes.postTitle }} 
            </router-link>
            <div class="introtext"> {{ post.attributes.introtext }} </div>
          </div>
        </div>
        <router-link to="posts/" style="text-decoration:none">
          <button class="btn btn-green-content btn-center">
            Все посты
          </button>
        </router-link>
        
      </section>
    </transition>

  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: "Home",
    data() {
      return {
        show: false,
        posts: []
      }
    },
    computed: {
      isOverlaySkew() {
        return this.show ? "overlay" : "overlay skew";
      }
    },
    metaInfo: {
      title: 'Web Journal',
      meta: [
        { vmid: 'description', property: 'description', content: 'Savayer Web Journal, a little bit of delirium' }        
      ],
    },
    mounted () {
      axios
        .get('http://savayer.localhost/api/articles/all')
        .then(response => {
          let posts = response.data          
          this.posts = posts.reverse().splice(0,2)
        })
    }
  };
</script>