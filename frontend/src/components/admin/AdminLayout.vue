<template>
  <main id="admin-app">
    <AdminHeader />
    <slot></slot>
  </main>
</template>

<script>
  import AdminHeader from '@/components/admin/AdminHeader.vue';

  export default {
    name: 'AdminLayout',
    components: {
      AdminHeader,
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'))
    }
  }
</script>