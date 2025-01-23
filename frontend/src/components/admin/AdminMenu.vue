<template>
  <div id="menu">
    <div id="menu-parent">Menu</div>
    <nav id="menu-child">
      <router-link :to="{ name: 'Admin' }" active-class="active">Dashboard</router-link>
      <router-link to="/admin/media" active-class="active">Media</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminMenu',
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>

<style lang="scss" scoped>
  #menu-parent {
    font-weight: bold;
    text-transform: uppercase;
  }
  #menu-child {
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    padding-top: 1rem;
    margin-left: 0.5rem;
    margin-top: 1rem;
    position: relative;
    &:after {
      content: '';
      display: block;
      width: 2px;
      height: 100%;
      background: var(--primary-color);
      position: absolute;
      left: 0;
      top: 0;
    }
    a {
      padding: 0.5rem;
      &.active {
        background: var(--primary-color);
        color: var(--secondary-color);
      }
    }
  }
</style>