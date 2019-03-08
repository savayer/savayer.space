<template>
  <div class="single-post">
    <div class="background-slides"></div>
    
    <div class="container" style="min-height: 100vh">        
        <img :src="post.attributes.image" class="post-image" :alt="post.attributes.postTitle">
        <h1> {{ post.attributes.postTitle }} </h1>
        <div class="content" v-html="post.attributes.content"></div>
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
        post: {}
      }
    },
    mounted () {
      this.id = this.slug.split('-')[0]
      axios
        .get('http://savayer.localhost/api/article/'+this.id)
        .then(response => {
          this.post = response.data
        })
    }
  }
</script>
