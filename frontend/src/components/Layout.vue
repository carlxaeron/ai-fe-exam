<template>
  <main id="app">
    <router-link to="/">Home</router-link> |
    <router-link to="/admin/">Admin</router-link>
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'LayoutComponent',
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
</style>