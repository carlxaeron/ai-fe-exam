<template>
  <header id="admin-header">
    <div id="admin-left-header">
      <h1>Admin Panel</h1>
      <div id="burger-nav" @click="handleMenuNav">
        <i class="fas fa-bars"></i>
      </div>
    </div>
    <div id="admin-right-header">
      <div class="admin-divider"></div>
      <div id="admin-user">
        <i class="fas fa-user"></i>
      </div>
      <div id="admin-user-name">
        {{ currentUser?.firstName }} {{ currentUser?.lastName }}
        <span>{{ currentUser?.type }}</span>
      </div>
      <div class="admin-divider"></div>
      <SwitchTheme />
      <div class="admin-divider"></div>
      <button id="logout-btn" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
      </button>
      <div class="admin-divider" style="opacity: 0;"></div>
    </div>
    <Confirmation :show="showLogoutConfirmation" title="Logout?" @onConfirm="confirm" @onCancel="cancel" />
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Confirmation from '../Confirmation.vue';
import SwitchTheme from '../SwitchTheme.vue';


export default {
  name: 'AdminHeader',
  components: {
    SwitchTheme,
    Confirmation,
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  computed: {
    ...mapGetters(['getViewPort']),
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    ...mapActions(['setCloseMenu']),
    logout() {
      this.showLogoutConfirmation = true;
    },
    confirm() {
      this.showLogoutConfirmation = false;
      this.$router.push({ name: 'Login' });
      this.$store.dispatch('logout');
      this.$store.dispatch('setNotification', {
        type: 'success',
        message: 'Logged out successfully',
        show: true,
      });
    },
    cancel() {
      this.showLogoutConfirmation = false;
    },
    handleMenuNav() {
      this.setCloseMenu()
    }
  },
  data() {
    return {
      showLogoutConfirmation: false,
    };
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';
.admin-divider {
  width: 1px;
  height: 1.5rem;
  background-color: var(--text-color);
  opacity: 0.4;
}
#admin-left-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  h1 {
    min-width: $menuWidth;
    margin: 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
  }
  #burger-nav {
    background: none;
    border: none;
    cursor: pointer;
    i {
      font-size: 1.5rem;
      color: var(--text-color);
    }
  }
}
#admin-right-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  #logout-btn {
    background: none;
    border: none;
    i {
      font-size: 1rem;
      color: var(--text-color);
    }
  }
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