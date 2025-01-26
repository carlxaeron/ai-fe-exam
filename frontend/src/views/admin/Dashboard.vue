<template>
  <Section id="admin-dashboard">
    <AdminToolbar icon="fas fa-tachometer-alt" :title="`${type && type.toUpperCase()}'s Dashboard`" />
    <h3>For {{ type === 'writer' ? 'Edit' : 'Publish' }}</h3>
    <ArticleList :data="articlesForEdit" :loading="isLoadingForEdit" />
    <h3>Published</h3>
    <ArticleList :data="publishedArticles" :loading="isLoadingPublished" />
  </Section>
</template>

<script>
  import AdminToolbar from '@/components/admin/AdminToolbar.vue';
  import ArticleList from '@/components/admin/AdminArticleList.vue';
  import { mapGetters } from 'vuex';
  import Section from '@/components/Section.vue';

  export default {
    name: 'DashboardView',
    components: {
      AdminToolbar,
      ArticleList,
      Section,
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'));
      this.$store.dispatch('fetchArticlesForEdit');
      this.$store.dispatch('fetchArticlesPublished');
    },
    computed: {
      ...mapGetters(['articlesForEditLoading', 'articlesPublishedLoading']),
      currentUser() {
        return this.$store.state.currentUser;
      },
      type() {
        return this.currentUser?.type;
      },
      articlesForEdit() {
        return this.$store.state.articlesForEdit;
      },
      publishedArticles() {
        return this.$store.state.articlesPublished;
      },
      isLoadingForEdit() {
        return this.articlesForEditLoading;
      },
      isLoadingPublished() {
        return this.articlesPublishedLoading;
      },
    },
  }
</script>

<style lang="scss" scoped>
  #admin-dashboard {

  }
</style>