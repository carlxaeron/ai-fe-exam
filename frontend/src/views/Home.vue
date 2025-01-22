<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld.vue'

  export default {
    name: 'HomeView',
    components: {
      // HelloWorld
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'))
    }
  }
</script>