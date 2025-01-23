<template>
  <footer id="footer">
    <p>&copy; {{ new Date().getFullYear() }}</p>
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