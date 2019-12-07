<template>
  <div class="single-post">
    <div class="background-slides"></div>
    
    <div class="container" style="min-height: 100vh;padding: 0 0 30px 0;background: #fbfbfb;">    
        <header class="header" style="background: #f8f8f8;">
          <h1>
            <router-link to="/">
              Web Journal
            </router-link>
          </h1>          
        </header>    
        <div class="post-wrapper">
          <Breadcrumbs :bc="breadcrumbs" />

          <h1 class="text-center"> {{ post.postTitle }} </h1>
          <a target="_blank" :href="post.image"><img :src="post.image" class="post-image" :alt="post.postTitle"></a>
          <div class="tags">
            <div class="tags__item " :class="'tags__item--'+(index+1)" v-for="(tag, index) in post.tags" :key="index">
              {{ tag.name }}
            </div>
          </div>
          <div class="content" v-html="post.content"></div>
        </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import Breadcrumbs from './modules/breadcrumbs'

  export default {
    name: 'single-post',
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        id: '',
        breadcrumbs: [],
        post: {}
      }
    },
    metaInfo () {
      return {
        title: this.post.postTitle ? this.post.postTitle  + ' | Web Journal' : '' + ' Web Journal'
      }      
    },
    mounted () {      
      this.id = this.slug.split('-')[0]
      axios
        .get(`${process.env.VUE_APP_SITE_URL}/api/article/${this.id}`)        
        .then(response => {
          this.post = response.data.attributes       
          this.breadcrumbs.push(
            { text: 'Главная', link: '/', thisPost: false },
            { text: 'Блог', link: '/posts', thisPost: false },
            { text: this.post.postTitle, link: '', thisPost: true }
          )          
        })            
    },
    components: {
      Breadcrumbs
    }
  }
</script>
