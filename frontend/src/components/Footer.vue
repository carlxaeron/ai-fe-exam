<template>
  <footer id="footer">
    <p>&copy; {{ new Date().getFullYear() }} CARL LOUIS MANUEL</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>

<style lang="scss" scoped>
  #footer {
    text-align: center;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1000;
  }
</style>