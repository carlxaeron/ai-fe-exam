<template>
  <header id="admin-header">
    <h1>Admin Panel</h1>
    <div id="admin-right-header">
      <div class="admin-divider"></div>
      <div id="admin-user">
        <i class="fas fa-user"></i>
      </div>
      <div id="admin-user-name">
        {{ currentUser.firstName }} {{ currentUser.lastName }}
        <span>{{ currentUser.type }}</span>
      </div>
      <div class="admin-divider"></div>
      <SwitchTheme />
    </div>
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
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';
.admin-divider {
  width: 1px;
  height: 1.5rem;
  background-color: var(--text-color);
}
#admin-right-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}
#admin-user-name {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 0.8rem;
  span {
    font-size: 0.8rem;
    color: var(--text-color);
    opacity: 0.8;
    text-transform: capitalize;
  }
}
#admin-user {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 0.5rem;
  border-radius: 50%;
  position: relative;
  width: 2rem;
  height: 2rem;
  * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
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