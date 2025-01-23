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

<style lang="scss">
#public-app {
  text-align: center;
}
</style>