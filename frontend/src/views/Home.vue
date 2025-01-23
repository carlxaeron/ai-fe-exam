<template>
    <section id="home">
      
    </section>
</template>

<script>


  export default {
    name: 'HomeView',
    components: {

    },
    mounted() {
      document.dispatchEvent(new Event('render-event'))
    }
  }
</script>