<template>
  <div id="dashboard">
    <AdminToolbar :title="`${type.toUpperCase()}'s Dashboard`" />
    <h3>For {{ type === 'writer' ? 'Edit' : 'Publish' }}</h3>
    <ArticleList :data="articlesForEdit" />
    <h3>Published</h3>
    <ArticleList :data="publishedArticles" />
  </div>
</template>

<script>
  import AdminToolbar from '@/components/admin/AdminToolbar.vue';
  import ArticleList from '@/components/ArticleList.vue';

  export default {
    name: 'DashboardView',
    components: {
      AdminToolbar,
      ArticleList,
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'));

      this.$store.dispatch('fetchArticlesForEdit');
      this.$store.dispatch('fetchArticlesPublished');
    },
    computed: {
      currentUser() {
        return this.$store.state.currentUser;
      },
      type() {
        return this.currentUser.type;
      },
      articlesForEdit() {
        return this.$store.state.articlesForEdit;
      },
      publishedArticles() {
        return this.$store.state.articlesPublished;
      },
    },
  }
</script>

<style lang="scss" scoped>
  #dashboard {
    h3 {
      margin-top: 2rem;
      margin-bottom: 0.5rem;
    }
  }
</style>