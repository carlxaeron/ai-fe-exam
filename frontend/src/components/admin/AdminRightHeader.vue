<template>
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
    <Confirmation :show="showLogoutConfirmation" title="Logout?" @onConfirm="confirm" @onCancel="cancel" />
  </div>
</template>

<script>
import SwitchTheme from '../SwitchTheme.vue';
import Confirmation from '../Confirmation.vue';

export default {
  name: 'AdminRightHeader',
  components: {
    SwitchTheme,
    Confirmation,
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
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
  },
  data() {
    return {
      showLogoutConfirmation: false,
    };
  },
}
</script>

<style lang="scss">
  @import '@/assets/styles/_variables.scss';

  .admin-divider {
    width: 1px;
    height: 1.5rem;
    background-color: var(--text-color);
    opacity: 0.4;
    @media (max-width: $md) {
      display: none;
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
  }
</style>