<template>
  <AdminLayoutComponent v-if="routeMeta.type === 'admin'">
    <router-view />
  </AdminLayoutComponent>
  <LayoutComponent v-else>
    <router-view />
  </LayoutComponent>
</template>

<script>
import LayoutComponent from '@/components/Layout.vue';
import AdminLayoutComponent from '@/components/admin/AdminLayout.vue';

export default {
  name: 'App',
  components: {
    LayoutComponent,
    AdminLayoutComponent,
  },
  computed: {
    routeMeta() {
      return this.$route.meta;
    }
  },
  watch: {
    $route(to) {
      // Perform any action based on route meta changes
      console.log('Route meta changed:', to.meta);
    }
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>