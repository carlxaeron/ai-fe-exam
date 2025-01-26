<template>
  <header id="header">
    <nav>
      <router-link :to="{name: 'Home'}">Home</router-link>
      <router-link :to="{name: 'Login'}">Login</router-link>
    </nav>
    <SwitchTheme />
  </header>
</template>

<script>
import SwitchTheme from './SwitchTheme.vue';

export default {
  name: 'HeaderComponent',
  components: {
    SwitchTheme,
  },
  computed: {
    routerMetaType() {
      return this.$route.meta.type;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

#header {
  padding: 10px;
  margin-bottom: 20px;
  background-color: var(--secondary-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  a {
    text-decoration: none;
  }
  ul, li {
    list-style-type: none;
    display: inline;
  }
  .switch-theme {
    position: absolute;
    top: 0;
    right: 0;
  }
  nav {
    display: flex;
    align-items: center;
    color: var(--text-color);
    padding: 10px;
    a {
      color: var(--text-color);
      text-decoration: none;
      margin-right: 10px;
    }
  }
}
</style>