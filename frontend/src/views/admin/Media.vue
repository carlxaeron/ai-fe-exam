<template>
  <div id="media">
    <AdminToolbar title="Media" />
    <div id="media-content">
      <h3>Media Content</h3>
      <ArticleList :data="articles" :config="{ withStatus: true }" />
    </div>
  </div>
</template>

<script>
import AdminToolbar from '@/components/admin/AdminToolbar.vue';
import ArticleList from '@/components/ArticleList.vue';

  export default {
    name: 'MediaView',
    components: {
      AdminToolbar,
      ArticleList,
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'));

      this.$store.dispatch('fetchArticles');
    },
    computed: {
      currentUser() {
        return this.$store.state.currentUser;
      },
      type() {
        return this.currentUser.type;
      },
      articles() {
        return this.$store.state.articles;
      },
    },
  }
</script>

<style lang="scss" scoped>
  #media {
    #media-content {
      h3 {
        margin-top: 2rem;
        margin-bottom: 0.5rem;
      }
    }
  }
</style>
