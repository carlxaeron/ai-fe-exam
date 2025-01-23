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
    <AdminArticle />
  </main>
</template>

<script>
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import AdminMenu from '@/components/admin/AdminMenu.vue';
  import { mapGetters } from 'vuex';
  import AdminArticle from './AdminArticle.vue';

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
      ...mapGetters(['isDarkTheme']),
    },
    methods: {
      getClass() {
        return {
          'dark-theme': this.isDarkTheme,
        }
      }
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
</style>