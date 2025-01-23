<template>
  <div id="admin-article">
    <Modal>
      <template v-slot:default>
        <form @submit.prevent="submitForm">

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" v-model="article.title" required>
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <QuillEditor v-model:content="article.content" content-type="html" :options="editorOptions" />
          </div>
          <div class="form-group">
            <label for="link">Link</label>
            <input type="text" id="link" name="link" v-model="article.link" required>
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <input type="file" id="image" name="image" required>
          </div>
          <div class="form-group">
            <label for="date">Date</label>
            <input type="date" id="date" name="date" v-model="article.date" required>
          </div>
          <div class="form-group">
            <label for="company">Company</label>
            <select id="company" name="company" required>
              <option value="1">Company 1</option>
              <option value="2">Company 2</option>
            </select>
          </div>
          <button type="submit">Create</button>
        </form>
      </template>
    </Modal>
    <button title="Create Article" id="create-admin-article-btn" @click="handleCreateArticle">
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Modal from '../Modal.vue';
import { mapActions } from 'vuex';
import apiService from '@/services/apiService';

export default {
  name: 'AdminArticle',
  components: {
    Modal,
    QuillEditor,
  },
  data() {
    return {
      editorOptions: {
        theme: 'snow',
      },
      article: {
        title: '',
        link: '',
        content: '',
        company: '',
        date: '',
        image: '',
      },
      content: '',
    }
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  methods: {
    ...mapActions(['toggleModal']),
    handleCreateArticle() {
      this.toggleModal();
    },
    submitForm() {
      console.log('submit form');
      apiService.createArticle(this.article)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          apiService.handleError(error);
        });
    },
  },
  watch: {
    content(value) {
      console.log(value);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/_variables.scss";

  #create-admin-article-btn {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: $green-1;
    border: none;
    color: white;
    padding: 1.5rem;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>