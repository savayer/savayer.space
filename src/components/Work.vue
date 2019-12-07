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
        <div class="post-wrapper post-wrapper--work">
          <Breadcrumbs :bc="breadcrumbs" />          

          <h1 class="text-center"> {{ work.name }} </h1>
          <a target="_blank" :href="work.image"><img :src="work.image" class="work-image" :alt="work.name"></a>
          <div class="content content--work" v-html="work.content"></div>
        </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import Breadcrumbs from './modules/breadcrumbs'
  
  export default {
    name: 'single-work',
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
        work: {}
      }
    },
    metaInfo () {
      return {
        title: this.work.name ? this.work.name  + ' | Web Journal' : '' + ' Web Journal'
      }      
    },
    mounted () {      
      this.id = this.slug.split('-')[0]
      axios
        .get(`${process.env.VUE_APP_SITE_URL}/api/work/${this.id}`)        
        .then(response => {
          this.work = response.data.attributes       
          this.breadcrumbs.push(
            { text: 'Главная', link: '/', thisPost: false },
            { text: 'Портфолио', link: '/portfolio', thisPost: false },
            { text: this.work.name, link: '', thisPost: true }
          )          
        })            
    },
    components: {
      Breadcrumbs
    }
  }
</script>
