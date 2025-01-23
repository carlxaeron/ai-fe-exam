<template>
  <header id="admin-header">
    <h1>Admin Panel</h1>
    <nav>
      <router-link :to="{ name: 'Admin' }">Dashboard</router-link>
    </nav>
    <SwitchTheme />
  </header>
</template>

<script>
import SwitchTheme from '../SwitchTheme.vue';

export default {
  name: 'AdminHeader',
  components: {
    SwitchTheme,
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

#admin-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
h1 {
  margin: 0;
}
nav {
  display: flex;
  justify-content: space-around;
}
header {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  left: 0;
  top: 0;
  background-color: var(--background-color);
  z-index: 1000;
}
</style>