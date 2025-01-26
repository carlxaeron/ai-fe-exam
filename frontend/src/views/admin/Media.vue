<template>
  <Section id="admin-media">
    <AdminToolbar icon="fas fa-images" title="Media" />
    <h3>Media Content</h3>
    <ArticleList :data="articles" :config="{ withStatus: true, withAction: true }" :loading="articlesLoading" />
  </Section>
</template>

<script>
import AdminToolbar from '@/components/admin/AdminToolbar.vue';
import ArticleList from '@/components/admin/AdminArticleList.vue';
import Section from '@/components/Section.vue';
import { mapGetters } from 'vuex';

  export default {
    name: 'MediaView',
    components: {
      AdminToolbar,
      ArticleList,
      Section,
    },
    data() {
      return {
        loading: false,
      };
    },
    mounted() {
      document.dispatchEvent(new Event('render-event'));

      this.loading = true;
      this.$store.dispatch('fetchArticles').then(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    computed: {
      ...mapGetters(['articlesLoading']),
      currentUser() {
        return this.$store.state.currentUser;
      },
      type() {
        return this.currentUser?.type;
      },
      articles() {
        return this.$store.state.articles;
      },
    },
  }
</script>

<style lang="scss" scoped>
  #admin-media {

  }
</style>
