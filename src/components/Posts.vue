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
        <div class="posts-content">
          <div class="content-header">              
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
            <div class="filter-icon">
              <div class="filter-img-wrapper open-filter" @click="openFilter = !openFilter">
                <img :src="getImg('filter.svg')" class="filter-img" title="Filter" alt="filter">
              </div>              
            </div>
            <transition name="slide-fade">
              <div class="filter-wrapper" v-show="openFilter">        
                <label v-for="(tag, tag_id) in tags" :key="tag_id" class="filter-label">
                  <input type="checkbox" v-model="checkedTags" :value="tag.id">
                  <span class="filter-checkmark"></span>            
                  {{ tag.name }}
                </label>
              </div>
            </transition>
          </div>              

          <masonry
            :cols="{default: 3, 992: 2, 500: 1}"
            :gutter="30"
            >           
          
            <div class="post" v-for="(post, index) in changeCheckedTags" :key="index">            
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
        tags: [],
        search: '',
        openFilter: false,
        checkedTags: []        
      }
    },
    computed: {
      /* searching () {        
        let s = this.search.toLowerCase()

        return this.posts.filter(post => Object.values(post.attributes).some(m => m.toString().toLowerCase().includes(s)));
      } */
      changeCheckedTags() {
        if (this.checkedTags.length > 0) {        
          let filteredPosts = [];
          this.posts.forEach(post => {
            if ( post.attributes.tags.some(tag => this.checkedTags.includes(tag.tag_id)) ) {
              filteredPosts.push(post);
            }
          })
          return filteredPosts
        } else return this.posts
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
          // create tags array
          this.posts.forEach(post => {
            post.attributes.tags.forEach(tag => {
              if (!this.tags.map(function(tagName) { return tagName.name; }).includes( tag.name )) {
                this.tags.push({ id: tag.tag_id, name: tag.name });
              }
            })
          })          

          this.breadcrumbs.push(
            { text: 'Главная', link: '/', thisPost: false },
            { text: 'Блог', link: '/posts', thisPost: true }            
          )
        })
    }
  }
</script>
