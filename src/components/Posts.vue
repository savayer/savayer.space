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
        <div class="search_wrapper ml-auto">
          <input type="text" class="search-text" v-model="search">
          <div class="search_results" v-show="showSearchResults"> 
            
            <div v-if="searching.length === 0" class="search_results__result">
              <span style="color: #555">No results</span>
            </div>

            <div v-else class="search_results__result" v-for="(item, index) in searching" :key="index">                          
              <router-link :to="`/posts/${item.id}-${item.attributes.slug}`" class="search_results__link">
                {{ item.attributes.postTitle }}
              </router-link>              
            </div>
          </div>
        </div>
      </header>

      <div class="posts-wrapper">
        <div class="posts-content">
          <div class="content-header">              
            <Breadcrumbs :bc="breadcrumbs" />          

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
  import Breadcrumbs from './modules/breadcrumbs'

  export default {
    name: 'posts',
    data () {
      return {
        breadcrumbs: [],
        posts: [],
        tags: [],
        search: '',
        showSearchResults: false,
        openFilter: false,
        checkedTags: []        
      }
    },
    computed: {
      searching () {
        let s = this.search.toLowerCase()
        this.emptySearchCondition(s)
        return this.posts.filter(post => Object.values(post.attributes).some(m => m.toString().toLowerCase().includes(s)));        
      },
      changeCheckedTags() {
        if (this.checkedTags.length > 0) {        
          let filteredPosts = [];
          this.posts.forEach(post => {
            // если встречается хоть один пост с выбранным тэгом, записываем его в массив, который будет разобран в v-for
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
      },
      emptySearchCondition (s) {
        s ? this.showSearchResults = true : this.showSearchResults = false
      },
    },
    metaInfo: {
      title: 'Web Journal Blog',
      meta: [
        { vmid: 'description', property: 'description', content: 'Savayer Web Journal Blog, a little bit of delirium' }        
      ],
    },
    mounted () {
      axios
        .get(`${process.env.VUE_APP_SITE_URL}/api/articles/all`)        
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
    },
    components: {
      Breadcrumbs
    }
  }
</script>
