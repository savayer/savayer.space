<template>
  <div class="wrapper">
    <div class="background-slides"></div> 
    <div :class="isOverlaySkew">
      <div class="overlay__stars"></div>
    </div>
    <section id="block-left">
      <div class="content">
        <h1>Hi, there!</h1>
        <p>I'm Junior frontend-developer. It's my homepage, where i write some posts for myself about developing, english language, etc.</p>
        <button class="btn btn-white" @click="show = !show">
          {{ changeButtonText }}
        </button>
      </div>
      
    </section>
    <transition name="slide">
      <section v-if="show" class="sidebar">
        <header>
          <span class="icon-cancel-circle close" @click="show = !show"></span>
        </header>
        
        <div class="posts">
          <div class="post" v-for="post in posts" :key="post.id">
            <img src="../assets/img/Vue.png" alt="">
            <router-link :to=" 'posts/' + post.slug " class="pagetitle"> {{ post.pagetitle }} </router-link>
            <div class="introtext"> {{ post.introtext }} </div>
          </div>
        </div>
      </section>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      show: false,
      posts: [
        { id: 1, img: '../assets/img/Vue.png', slug: 'first-try-create-spa', pagetitle: 'Первая попытка осознания архитектуры SPA', introtext: 'Пробуем-с создать SPA с помощью Vuejs...', content: `<h1>it's my first experince with SPA</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae delectus architecto a cum. Eligendi, a id! Aliquam quis cumque beatae doloremque, ipsa, quaerat sunt voluptatum iure hic sequi, provident adipisci.</p>` },
        /* { id: 2, slug: 'second-post', pagetitle: 'test 2', introtext: 'intro 2', content: 'no comments' }, */
      ]
    }
  },
  computed: {
    isOverlaySkew() {
      return this.show ? 'overlay' : 'overlay skew';
    },
    changeButtonText() {
        return this.show ? 'Hide informations' : 'More informations';
    }
  }

}
</script>