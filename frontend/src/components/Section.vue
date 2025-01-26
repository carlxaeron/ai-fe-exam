<template>
  <section class="section">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'SectionComponent',
}
</script>

<style lang="scss">
.section {
  h3 {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
}
</style>