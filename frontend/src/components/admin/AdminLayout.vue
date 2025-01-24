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
  </main>
</template>

<script>
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import AdminMenu from '@/components/admin/AdminMenu.vue';
  import { mapGetters } from 'vuex';
  import AdminArticle from './AdminArticle.vue';
import { WRITER } from '@/utils/helper';

  export default {
    name: 'AdminLayout',
    components: {
      AdminHeader,
      AdminMenu,
      AdminArticle,
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'))
    },
    computed: {
      ...mapGetters(['isDarkTheme', 'isShowAdminArticle']),
    },
    methods: {
      getClass() {
        return {
          'dark-theme': this.isDarkTheme,
        }
      },
      handleCreateArticle() {
        this.$store.dispatch('showAdminArticle', true);
      },
      checkCreateBtn() {
        return this.$store.getters.getCurrentUser.type === WRITER;
      },
    }
  }
</script>

<style lang="scss">
  @import '@/assets/styles/_variables.scss';

  #admin-content {
    display: flex;
    flex-direction: row;
  }
  #content-menu {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #dee2e6;
    padding: 20px;
    width: 250px;
    height: 100vh;
  }
  #content {
    flex: 1;
    padding: 2rem;
  }
  .dark-theme {
    @include dark-theme;
    #content-menu {
      background-color: darken($background-color, 10%);
      border-right-color: darken($background-color, 20%);
    }
    #content {
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