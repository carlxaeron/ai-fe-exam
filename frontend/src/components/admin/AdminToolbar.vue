<template>
  <div id="admin-toolbar" :class="getClass">
    <h2>{{ title }}</h2>
    <div id="admin-toolbar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminToolbar',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  computed: {
    getClass() {
      return this.$store.state.isDarkTheme ? 'dark-theme' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
  #admin-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
    margin-bottom: 1rem;
    &.dark-theme {
      border-bottom: 1px solid #dee2e61a;
    }
  }
</style>