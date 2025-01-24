<template>
  <div class="article-list">
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Link</th>
          <th>Date</th>
          <th>Writer</th>
          <th>Editor</th>
          <th v-if="config.withStatus">Status</th>
          <th v-if="isWithAction">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="articles.length === 0">
          <td colspan="7">No articles found.</td>
        </tr>
        <tr v-else v-for="article in articles" :key="article.id">
          <td><img v-if="article.image" :src="article.image" alt="Article Image" /></td>
          <td>{{ article.title }}</td>
          <td><a :href="article.link" target="_blank">Link</a></td>
          <td>{{ article.date }}</td>
          <td>{{ article.writer && article.writer.lastName }}{{ article.writer ? ', ' : '' }}{{ article.writer && article.writer.firstName }}</td>
          <td>{{ article.editor && article.editor.lastName }}{{ article.editor ? ', ' : '' }}{{ article.editor && article.editor.firstName }}</td>
          <td v-if="config.withStatus">
            <Badge :type="getBadgeType(article.status)">{{ article.status }}</Badge>
          </td>
          <td v-if="isWithAction">
            <Button v-if="isAbleToEdit(article.status)" @click="handleEdit(article)">Edit</Button>
          </td>
        </tr>
      </tbody>
    </table>
    <Loader v-show="loading" :relative="true" :bgColor="'light'"/>
  </div>
</template>

<script>
import { EDITOR, FOR_EDIT, WRITER } from '@/utils/helper';
import Button from './Button.vue';
import Loader from './Loader.vue';
const { mapGetters } = require('vuex');
import Badge from './Badge.vue';

export default {
  name: 'ArticleListComponent',
  components: {
    Loader,
    Button,
    Badge,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getCurrentUser']),
    articles() {
      return this.data;
    },
    isWithAction() {
      return this.config.withAction;
    },
    userType() {
      return this.getCurrentUser.type;
    }
  },
  methods: {
    isAbleToEdit(articleStatus) {
      let yes = false;
      if (articleStatus === FOR_EDIT && this.userType === WRITER) {
        yes = true;
      } else if (this.userType === EDITOR) {
        yes = true;
      }
      return yes;
    },
    getBadgeType(status) {
      let type = 'primary';
      switch (status) {
        case 'For Edit':
          type = 'warning';
          break;
        case 'Published':
          type = 'success';
          break;
        default:
          type = 'primary';
          break;
      }
      return type;
    },
    handleEdit(article) {
      this.$store.dispatch('setArticle', article);
    },
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
}
</script>

<style lang="scss">
.article-list {
  position: relative;
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    min-height: 10vh;
    th, td {
      border: 1px solid var(--primary-color);
      padding: 8px;
      color: black;
      a {
        text-decoration: underline;
      }
    }
    th {
      background-color: var(--secondary-color);
      text-align: left;
      color: var(--primary-color);
    }
    img {
      max-width: 100px;
    }
  }
}
</style>