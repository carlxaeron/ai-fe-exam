<template>
  <div id="admin">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App - Admin"/>
  </div>
</template>

<script>
  import HelloWorld from '../../components/HelloWorld.vue'

  export default {
    name: 'AdminHomeView',
    components: {
      HelloWorld
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'))
    }
  }
</script>