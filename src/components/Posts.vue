<template>
  <div id="posts">    
    <div class="background-slides"></div>
    <div class="container" style="min-height:100vh;padding:0">

      <header class="header">
        <h1>
          <router-link to="/">
            Web Journal
          </router-link>
        </h1>
        <input type="text" class="search-text ml-auto" v-model="search">
      </header>

      <div class="posts-wrapper">
        <!-- <div class="posts-sidebar">
          <ul class="categories">
            <li class="active"><a href="#10">All</a></li>
            <li><a href="#1">Category 1</a></li>
            <li><a href="#2">Category 2</a></li>
            <li><a href="#3">Category 3</a></li>
            <li><a href="#4">Category 4</a></li>
            <li><a href="#5">Category 5</a></li>
            <li><a href="#6">Category 6</a></li>
            <li><a href="#7">Category 7</a></li>
            <li><a href="#8">Category 8</a></li>
            <li><a href="#9">Category 9</a></li>
          </ul>
        </div> -->
        <div class="posts-content">
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
          <masonry
            :cols="{default: 3, 992: 2, 500: 1}"
            :gutter="30"
            >           
          
            <div class="post" v-for="(post, index) in searching" :key="index">            
              <!-- <router-link :to="{ name: 'single-post', params: { slug: post.slug, img: post.img } }"> -->
              <router-link :to="`/posts/${post.id}-${post.attributes.slug}`">
                <img :src="post.attributes.image" :alt="post.attributes.postTitle">
              </router-link>
              <div class="post-meta">
                <div class="title">
                  <router-link :to="`/posts/${post.id}-${post.attributes.slug}`">
                    {{ post.attributes.postTitle }}
                  </router-link>                  
                </div>
                <div class="introtext"> {{ post.attributes.introtext }}... </div>
              </div>
            </div>
          </masonry>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios'  

  export default {
    name: 'posts',
    data () {
      return {
        breadcrumbs: [],
        posts: [],
        search: ''
      }
    },
    computed: {
      searching () {        
        let s = this.search.toLowerCase()

        return this.posts.filter(post => Object.values(post.attributes).some(m => m.toString().toLowerCase().includes(s)));
      }
    },
    methods: {
      getImg(pic) {
        return require(`@/assets/img/${pic}`)
      }
    },
    metaInfo: {
      title: 'Web Journal Blog',
      meta: [
        { vmid: 'description', property: 'description', content: 'Savayer Web Journal Blog, a little bit of delirium' }        
      ],
    },
    mounted () {
      axios
        .get('http://savayer.localhost/api/articles/all')
        .then(response => {
          let posts = response.data
          this.posts = posts.reverse()          
          this.breadcrumbs.push(
            { text: 'Главная', link: '/', thisPost: false },
            { text: 'Блог', link: '/posts', thisPost: true }            
          )
        })
    }
  }
</script>
