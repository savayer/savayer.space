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
            Если вы это читаете, значит вы перешли на мой сайт с моего круга или hh, тогда я должен вам сказать, что я открыт для предложений и оставить свои контактные данные для связи.            
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
            <img :src="require(`@/assets/img/${post.img}`)" alt="">
            <router-link :to=" 'posts/' + post.slug " class="pagetitle"> {{ post.pagetitle }} </router-link>
            <div class="introtext"> {{ post.introtext }} </div>
          </div>
        </div>
        <button class="btn btn-green-content btn-center">
          <router-link to="posts/">
            Все посты
          </router-link>
        </button>
        
      </section>
    </transition>

  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      show: false,
      posts: [
        {
          id: 1,
          img: "Vue.png",
          slug: "first-try-create-spa",
          pagetitle: "Первая попытка осознания архитектуры SPA",
          introtext: "Пробуем-с создать SPA с помощью Vuejs...",
          content: `<h1>it's my first experince with SPA</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae delectus architecto a cum. Eligendi, a id! Aliquam quis cumque beatae doloremque, ipsa, quaerat sunt voluptatum iure hic sequi, provident adipisci.</p>`
        },        
      ]
    };
  },
  computed: {
    isOverlaySkew() {
      return this.show ? "overlay" : "overlay skew";
    },
    changeButtonText() {
      return this.show ? "Hide informations" : "More informations";
    }
  },
  mounted () {
    setTimeout(() => {
      this.show = true
    }, 1000)
  }
};
</script>