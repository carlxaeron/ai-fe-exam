<template>
  <div class="table">
    <table>
      <slot></slot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TableComponent',
}
</script>

<style lang="scss">
  .table {
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