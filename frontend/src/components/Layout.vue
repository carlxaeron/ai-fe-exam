<template>
  <main id="app">
    <Header />
    <router-view />
  </main>
</template>

<script>
import Header from './Header.vue'

export default {
  name: 'LayoutComponent',
  components: {
    Header
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #f8f9fa;
}
</style>