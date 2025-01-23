<template>
  <div :class="themeClass">
    <AdminLayoutComponent v-if="routeMeta.type === 'admin'">
      <router-view />
    </AdminLayoutComponent>
    <LayoutComponent v-else>
      <router-view />
    </LayoutComponent>
    <NotificationComponent />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LayoutComponent from '@/components/Layout.vue';
import AdminLayoutComponent from '@/components/admin/AdminLayout.vue';
import NotificationComponent from '@/components/Notification.vue';

export default {
  name: 'App',
  components: {
    LayoutComponent,
    AdminLayoutComponent,
    NotificationComponent,
  },
  methods: {
    ...mapActions(['applyInitialTheme']),
  },
  computed: {
    ...mapGetters(['isDarkTheme']),
    routeMeta() {
      return this.$route.meta;
    },
    themeClass() {
      return this.isDarkTheme ? 'dark-theme' : 'light-theme';
    },
  },
  watch: {
    $route(to) {
      // Perform any action based on route meta changes
      console.log('Route meta changed:', to.meta);
    }
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));
    this.applyInitialTheme();
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/_variables.scss';

.light-theme {
  @include light-theme;
}

.dark-theme {
  @include dark-theme;
}
</style>