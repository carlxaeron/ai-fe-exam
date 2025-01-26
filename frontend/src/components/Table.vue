<template>
  <div :class="`table ${isDarkTheme ? 'dark-theme' : ''}`">
    <table>
      <slot></slot>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TableComponent',
  computed: {
    ...mapGetters(['isDarkTheme']),
  },
}
</script>

<style lang="scss">
  .table {
    &.dark-theme {
      a {
        color: black;
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      min-height: 10vh;
      th, td {
        border: 1px solid var(--primary-color);
        padding: 8px;
        color: black;
        a {
          text-decoration: underline;
        }
      }
      th {
        background-color: var(--secondary-color);
        text-align: left;
        color: var(--primary-color);
      }
      img {
        max-width: 100px;
      }
    }
  }
</style>