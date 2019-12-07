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
              <router-link :to="`/portfolio/${item.id}-${item.attributes.slug}`" class="search_results__link">
                {{ item.attributes.name }}
              </router-link>              
            </div>
          </div>
        </div>
      </header>

      <div class="posts-wrapper">
        <div class="posts-content">
          <div class="content-header">              
            <Breadcrumbs :bc="breadcrumbs" />
          </div>              

          <masonry
            :cols="{default: 2, 992: 1}"
            :gutter="30"
            >           
          
            <div class="post post--work" v-for="(work, index) in this.works" :key="index">
              <router-link :to="`/portfolio/${work.id}-${work.attributes.slug}`">
                <img :src="work.attributes.image" :alt="work.attributes.name">
              </router-link>
              <div class="post-meta post-meta--work">
                <div class="title title--work">
                  <router-link :to="`/portfolio/${work.id}-${work.attributes.slug}`">
                    {{ work.attributes.name }}
                  </router-link>                  
                </div>                
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
    name: 'works',
    data () {
      return {
        breadcrumbs: [],
        works: [],
        search: '',
        showSearchResults: false,
      }
    },
    computed: {
      searching() {
        let s = this.search.toLowerCase()
        this.emptySearchCondition(s)
        return this.works.filter(work => Object.values(work.attributes).some(m => m.toString().toLowerCase().includes(s)));        
      },
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
      title: 'Portfolio',
    },
    mounted () {
      axios
        .get(`${process.env.VUE_APP_SITE_URL}/api/works/all`)        
        .then(response => {          
          let works = response.data
          this.works = works.reverse()          
          
          this.breadcrumbs.push(
            { text: 'Главная', link: '/', thisPost: false },
            { text: 'Портфолио', link: '/portfolio', thisPost: true }            
          )
        })
    },
    components: {
      Breadcrumbs
    }
  }
</script>
