<template>
  <header id="admin-header" ref="header">
    <div id="admin-left-header">
      <h1>Admin Panel</h1>
      <div id="burger-nav" @click="handleMenuNav">
        <i class="fas fa-bars"></i>
      </div>
    </div>
    <div id="admin-right-header-desktop">
      <AdminRightHeader />
    </div>
    <div id="admin-right-header-mobile" :class="showRightMenu ? 'show-menu' : ''">
      <button @click="showRightMenu = !showRightMenu">
        <i class="fas fa-bars"></i>
      </button>
      <AdminRightHeader :style="{ top: getHeaderHeight }" />
    </div>
    <slot name="header"></slot>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AdminRightHeader from './AdminRightHeader.vue';

export default {
  name: 'AdminHeader',
  components: {
    AdminRightHeader,
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))

    this.headerHeight = this.$refs.header.clientHeight;
  },
  computed: {
    ...mapGetters(['getViewPort']),
    currentUser() {
      return this.$store.state.currentUser;
    },
    getHeaderHeight() {
      return `${this.headerHeight}px`;
    }
  },
  methods: {
    ...mapActions(['setCloseMenu']),
    handleMenuNav() {
      this.setCloseMenu()
    }
  },
  data() { 
    return {
      showRightMenu: false,
      headerHeight: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

#admin-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  // position: relative;
  @media (max-width: $md) {
    #admin-right-header-desktop {
      display: none;
    }
    #admin-right-header-mobile {
      display: block;
      > button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        i {
          font-size: 1.5rem;
          color: var(--text-color);
        }
      }
      #admin-right-header {
        display: flex;
        flex-direction: column;
        position: fixed;
        right: 0;
        top: 0;
        height: 100vh;
        background-color: var(--background-color);
        padding: 1rem;
        gap: 1rem;
        justify-content: flex-start;
        transition: transform 0.3s;
        transform: translateX(100%);
      }
      &.show-menu {
        #admin-right-header {
          transform: translateX(0);
        }
      }
    }
  }
  @media (min-width: $md) {
    #admin-right-header-mobile {
      display: none;
    }
  }
  #admin-left-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    h1 {
      margin: 0;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      @media (min-width: $md) {
        min-width: $menuWidth;
      }
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