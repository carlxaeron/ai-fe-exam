<template>
  <main id="admin-app" :class="getClass">
    <AdminHeader />
    <div id="admin-content">
      <section id="content-menu">
        <AdminMenu />
      </section>
      <section id="content">
        <slot></slot>
      </section>
    </div>
    <AdminArticle v-if="isShowAdminArticle" />
    <button v-if="checkCreateBtn" title="Create Article" id="create-admin-article-btn" @click="handleCreateArticle">
      <i class="fas fa-plus"></i>
    </button>
    <Footer />
  </main>
</template>

<script>
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import AdminMenu from '@/components/admin/AdminMenu.vue';
  import { mapGetters } from 'vuex';
  import AdminArticle from './AdminArticle.vue';
  import { WRITER } from '@/utils/helper';
import Footer from '../Footer.vue';

  export default {
    name: 'AdminLayout',
    components: {
      AdminHeader,
      AdminMenu,
      AdminArticle,
      Footer,
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'))
    },
    computed: {
      ...mapGetters(['isDarkTheme', 'isShowAdminArticle', 'getViewPort', 'closeMenu']),
      checkCreateBtn() {
        return this.$store.getters.getCurrentUser?.type === WRITER;
      },
      getClass() {
        return {
          'dark-theme': this.isDarkTheme,
          'hide-menu': this.closeMenu.desktop,
          'show-menu': !this.closeMenu.desktop,
          'hide-mobile-menu': this.closeMenu.mobile,
          'show-mobile-menu': !this.closeMenu.mobile,
        }
      },
    },
    methods: {
      handleCreateArticle() {
        this.$store.dispatch('showAdminArticle', true);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/_variables.scss';
  
  @media (min-width: #{$md}) {
    .hide-menu {
      #content {
        padding-left: 2rem;
      }
      #content-menu {
        transform: translateX(-#{$menuWidth});
      }
    }
    .show-menu {
      #content {
        padding-left: calc(2rem + #{($menuWidth)});
      }
      #content-menu {
        transform: translateX(0);
      }
    }
  }
  @media (max-width: #{$md}) {
    .hide-mobile-menu {
      #content {
        padding-left: 2rem;
      }
      #content-menu {
        transform: translateX(-100%);
      }
    }
    .show-mobile-menu {
      #content {
        padding-left: 2rem;
      }
      #content-menu {
        transform: translateX(0);
      }
    }
  }
  #admin-content {
    display: flex;
    flex-direction: row;
    position: relative;
    overflow: auto;
    min-height: 100vh;
  }
  #content-menu {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #dee2e6;
    padding: 20px;
    width: $menuWidth;
    height: 100vh;
    transform: translateX(0);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    transition: transform 0.3s;
    background-color: var(--background-color);
  }
  #content {
    flex: 1;
    padding: 2rem;
    transition: padding-left 0.3s;
  }
  .dark-theme {
    @include dark-theme;
    #content-menu {
      background-color: darken($background-color, 10%);
      border-right-color: darken($background-color, 20%);
    }
    #content, #admin-content {
      background-color: darken($background-color, 5%);
    }
  }
  #create-admin-article-btn {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: $green-1;
    border: none;
    color: white;
    padding: 1.5rem;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>