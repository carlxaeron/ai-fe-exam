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
a {
  text-decoration: none;
}
</style>