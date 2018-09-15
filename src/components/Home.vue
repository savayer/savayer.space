<template>
  <div class="wrapper">
    <div class="background-slides"></div> 
    <div :class="isOverlaySkew">
      <div class="overlay__stars"></div>
    </div>
    <section id="block-left">
      <div class="content">
        <h1>Hi, there!</h1>
        <p>I'm Junior frontend-developer. I want to grow as a developer. I like to create web-sites, write code in JavaScript. Skills: HTML, CSS, JavaScript (JQuery, Vuejs), basic knowledge of PHP, Laravel</p>
        <ul class="ul_buttons">
          <li>
            <a class="btn btn-white" @click="show = !show">
              {{ changeButtonText }}
            </a>    
          </li>
          <li>
            <router-link to="posts/" class="btn btn-green">
              Blog
            </router-link>
          </li>
        </ul>              
        <div class="social">
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
      </div>
      
    </section>
    <transition name="slide">
      <section v-if="show" class="sidebar">
        <header>
          <span class="icon-cancel-circle close" @click="show = !show"></span>
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
          <h3>Ну-с, ещё один бложик</h3>
          <p>
            Ещё одно создание блога. Сначала был создан блог на MODX'e, затем на Laravel'e, теперь процесс создания первого SPA пока идёт только на фронте, с использованием VueJS, Vuex, Vue-router.
            Здесь я планировал оставлять различного рода посты, с решенными рабочими проблемами, посты для освежения памяти правилами грамматики английского языка. Всё это можно найти на сотнях и тысячах ресурсов, но у меня есть свободное время на выходных... 
          </p>
          <p>
            Давайте проводить свободное время с пользой, охватывая тёмные области, сочетая приятное с полезным :)
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
        {
          id: 2,
          img: "Vue.png",
          slug: "first-try-create-spa",
          pagetitle: "Первая попытка осознания архитектуры SPA",
          introtext: "Пробуем-с создать SPA с помощью Vuejs...",
          content: `<h1>it's my first experince with SPA</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae delectus architecto a cum. Eligendi, a id! Aliquam quis cumque beatae doloremque, ipsa, quaerat sunt voluptatum iure hic sequi, provident adipisci.</p>`
        },
        {
          id: 3,
          img: "Vue.png",
          slug: "first-try-create-spa",
          pagetitle: "Первая попытка осознания архитектуры SPA",
          introtext: "Пробуем-с создать SPA с помощью Vuejs...",
          content: `<h1>it's my first experince with SPA</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae delectus architecto a cum. Eligendi, a id! Aliquam quis cumque beatae doloremque, ipsa, quaerat sunt voluptatum iure hic sequi, provident adipisci.</p>`
        }
        
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
  }
};
</script>