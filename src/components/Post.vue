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
          <input type="text" class="search-text ml-auto">
        </header>    
        <div class="post-wrapper">
          <div class="breadcrumbs">
            <span v-for="(crumb, index) in breadcrumbs" :key="index">
              <router-link class="crumb" :to="crumb.link" v-if="!crumb.thisPost">
                {{ crumb.text }}
              </router-link>
              <span class="crumb" v-else>
                {{ crumb.text }}
              </span>
            </span>
            
          </div>

          <h1 class="text-center"> {{ post.postTitle }} </h1>
          <img :src="post.image" class="post-image" :alt="post.postTitle">
          <div class="content" v-html="post.content"></div>
        </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  
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
    mounted () {      
      this.id = this.slug.split('-')[0]
      axios
        .get('http://savayer.localhost/api/article/'+this.id)
        .then(response => {
          this.post = response.data.attributes       
          this.breadcrumbs.push(
            { text: 'Главная', link: '/', thisPost: false },
            { text: 'Блог', link: '/posts', thisPost: false },
            { text: this.post.postTitle, link: '', thisPost: true }
          )
        })            
    }
  }
</script>
