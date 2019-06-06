<template>
  <div id="app">
    <transition name="pagefade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="scss" src="./assets/scss/main.scss"></style>