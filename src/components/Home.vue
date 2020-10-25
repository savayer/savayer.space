<template>
  <div class="wrapper reverse">
    <div class="background-slides"></div> 
    <div class="overlay">
      <div class="overlay__stars"></div>
    </div>
<!--    <span v-if="!show" class="icon-menu custom-icon-menu" @click="show = !show"></span>
    <span v-else class="icon-cancel-circle close" @click="show = !show"></span>-->
    <section id="block-left">
      <div class="content">
        <h1 class="uppercase">just write the code</h1>
      </div>
    </section>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: "Home",
    data: () => ({
      show: false,
      posts: []
    }),
    computed: {
      isOverlaySkew () {
        return this.show ? "overlay" : "overlay skew";
      }
    },
    metaInfo: {
      title: 'Savayer'
    },
    /*mounted () {
      axios
        .get(`${process.env.VUE_APP_SITE_URL}/api/articles/all`)
        .then(response => {
          let posts = response.data          
          this.posts = posts.reverse().splice(0,2)
        })
    }*/
  };
</script>