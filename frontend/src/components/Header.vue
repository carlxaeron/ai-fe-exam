<template>
  <header>
    <router-link v-show="routerMetaType !== 'login'" :to="{name: 'Home'}">
      <img src="https://placehold.co/250x150" alt="Logo" />
    </router-link>
    <nav>
      <router-link :to="{name: 'Home'}">Home</router-link>
      <router-link :to="{name: 'Login'}">Login</router-link>
      <router-link :to="{name: 'Admin'}">Admin</router-link>
      <div id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{name: 'Home'}" class="nav-link">Home</router-link> |
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Login'}" class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
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
header {
  padding: 10px;
  margin-bottom: 20px;
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
}
</style>