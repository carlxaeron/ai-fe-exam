<template>
  <div id="media">
    <AdminToolbar title="Media">
      <template v-slot:right>
        <button>Upload</button>
      </template>
    </AdminToolbar>
    <div id="media-content">
      <h3>Media Content</h3>
    </div>
  </div>
</template>

<script>
import AdminToolbar from '@/components/admin/AdminToolbar.vue';

  export default {
    name: 'MediaView',
    components: {
      AdminToolbar,
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'))
    },
    computed: {
      currentUser() {
        return this.$store.state.currentUser;
      },
      type() {
        return this.currentUser.type;
      },
    },
  }
</script>
