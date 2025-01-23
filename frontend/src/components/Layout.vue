<template>
  <main id="public-app">
    <Header />
    <slot></slot>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'LayoutComponent',
  components: {
    Header,
    Footer,
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>

<style>
#public-app {
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