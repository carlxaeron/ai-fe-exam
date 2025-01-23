<template>
  <div id="dashboard">
    hello
  </div>
</template>

<script>
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