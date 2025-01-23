<template>
  <div id="dashboard">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App - Admin"/> -->
  </div>
</template>

<script>
  // import HelloWorld from '../../components/HelloWorld.vue'

  export default {
    name: 'DashboardView',
    components: {
      // HelloWorld
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'))
    }
  }
</script>