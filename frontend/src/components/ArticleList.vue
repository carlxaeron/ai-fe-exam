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
          <td>{{ article.link }}</td>
          <td>{{ article.date }}</td>
          <td>{{ article.writer && article.writer.lastName }}{{ article.writer ? ', ' : '' }}{{ article.writer && article.writer.firstName }}</td>
          <td>{{ article.editor && article.editor.lastName }}{{ article.editor ? ', ' : '' }}{{ article.editor && article.editor.firstName }}</td>
          <td v-if="config.withStatus">{{ article.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ArticleListComponent',
  props: {
    data: {
      type: Array,
      required: true,
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    articles() {
      return this.data;
    },
  },
}
</script>

<style lang="scss">
.article-list {
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    th, td {
      border: 1px solid var(--primary-color);
      padding: 8px;
      color: black;
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