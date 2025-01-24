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
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td><img v-if="article.image" :src="article.image" alt="Article Image" /></td>
          <td>{{ article.title }}</td>
          <td><a :href="article.link" target="_blank">Link</a></td>
          <td>{{ article.date }}</td>
          <td>{{ article.writer && article.writer.lastName }}{{ article.writer ? ', ' : '' }}{{ article.writer && article.writer.firstName }}</td>
          <td>{{ article.editor && article.editor.lastName }}{{ article.editor ? ', ' : '' }}{{ article.editor && article.editor.firstName }}</td>
          <td v-if="config.withStatus">{{ article.status }}</td>
        </tr>
      </tbody>
    </table>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import Loader from './Loader.vue';

export default {
  name: 'ArticleListComponent',
  components: {
    Loader,
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
    articles() {
      return this.data;
    },
  },
  watch: {
    loading(val, oldVal) {
      console.log('loading changed', val, oldVal);
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
.loader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>