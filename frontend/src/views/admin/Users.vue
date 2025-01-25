<template>
  <section id="users">
    <AdminToolbar icon="fas fa-users" title="Users" />
    <h3>Create/Edit</h3>
  </section>
</template>

<script>
import AdminToolbar from '@/components/admin/AdminToolbar.vue';

export default {
  name: 'UsersView',
  components: {
    AdminToolbar,
  },
}
</script>

<style>

</style>