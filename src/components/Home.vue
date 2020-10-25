<template>
  <div class="wrapper reverse">
    <div class="background-slides"></div> 
    <div class="overlay">
      <div class="overlay__stars"></div>
    </div>
    <section id="block-left">
      <div class="content">
        <h1 class="uppercase">just write the code</h1>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: "Home",
    data: () => ({
      show: false,
      posts: []
    }),
    metaInfo: {
      title: 'Savayer'
    }
  };
</script>