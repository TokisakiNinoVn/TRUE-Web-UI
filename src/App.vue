<template>
  <!-- <LayoutBlank />
  <div id="app"> -->
    <router-view />
    <!-- <Footer />
  </div> -->
</template>

<script>
// import LayoutBlank from '@/layouts/default/layout-Blank.vue'
// import Footer from '@/views/components/AppFooter.vue'

export default {
  name: 'App',
  // components: {
  //   LayoutBlank,
  //   Footer
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
