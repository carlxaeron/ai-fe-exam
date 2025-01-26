<template>
  <div id="menu">
    <div id="menu-parent">Menu</div>
    <nav id="menu-child">
      <router-link :to="{ name: 'Admin' }" active-class="active">
        <i class="fas fa-tachometer-alt"></i>Dashboard</router-link>
      <router-link to="/admin/media" active-class="active">
        <i class="fas fa-images"></i>
        Media</router-link>
    </nav>
    <template v-if="currentUser?.type === 'editor'">
      <div id="menu-parent">Users</div>
      <nav id="menu-child">
        <router-link :to="{ name: 'Users' }" active-class="active">
          <i class="fas fa-users"></i>
          Create/Edit</router-link>
      </nav>
    </template>
    <div id="menu-parent">Settings</div>
    <nav id="menu-child">
      <router-link to="/settings" active-class="active">
        <i class="fas fa-cog"></i>Settings</router-link>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminMenu',
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  computed: {
    ...mapGetters(['getCurrentUser']),
    currentUser() {
      return this.getCurrentUser;
    },
  },
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
    padding-bottom: 1rem;
    margin-left: 0.5rem;
    margin-top: 1rem;
    position: relative;
    & + #menu-parent {
      margin-top: 2rem;
    }
    &:after {
      content: '';
      display: block;
      width: 2px;
      height: 100%;
      background: var(--primary-color);
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.5;
    }
    a {
      padding: 0.5rem;
      &.active {
        background: var(--primary-color);
        color: var(--secondary-color);
      }
      i {
        margin-right: 0.5rem;
      }
    }
  }
</style>