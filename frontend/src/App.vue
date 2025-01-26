<template>
  <div :class="themeClass">
    <AdminLayoutComponent v-if="routeMeta.type === 'admin'">
      <router-view />
    </AdminLayoutComponent>
    <LayoutComponent v-else>
      <router-view />
    </LayoutComponent>
    <NotificationComponent />
    <ConfirmationComponent :show="isConfirmation" @onConfirm="confirmationConfirm" @onCancel="confirmationCancel" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LayoutComponent from '@/components/Layout.vue';
import AdminLayoutComponent from '@/components/admin/AdminLayout.vue';
import NotificationComponent from '@/components/Notification.vue';
import ConfirmationComponent from './components/Confirmation.vue';

export default {
  name: 'App',
  components: {
    LayoutComponent,
    AdminLayoutComponent,
    NotificationComponent,
    ConfirmationComponent,
  },
  methods: {
    ...mapActions(['applyInitialTheme', 'toggleConfirmModal', 'setViewPort']),
    confirmationConfirm() {
      this.toggleConfirmModal();
      this.getConfirmModal.onConfirm();
    },
    confirmationCancel() {
      this.toggleConfirmModal();
    },
    handleResize() {
      console.log('Resizing...');
      this.calculateViewPort();
    },
    calculateViewPort() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.setViewPort({ width, height });
    }
  },
  computed: {
    ...mapGetters(['isDarkTheme' , 'getConfirmModal']),
    routeMeta() {
      return this.$route.meta;
    },
    themeClass() {
      return this.isDarkTheme ? 'dark-theme' : 'light-theme';
    },
    isConfirmation() {
      return this.getConfirmModal.show;
    }
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

    document.addEventListener('resize', this.handleResize);
    window.onresize = this.handleResize;
    this.calculateViewPort();
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