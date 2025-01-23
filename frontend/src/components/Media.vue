<template>
  <div id="media">
    <h1>Media</h1>
  </div>
</template>

<script>
export default {
  name: 'MediaView',
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>