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
            <input type="file" id="image" name="image">
          </div>
          <div class="form-group">
            <label for="date">Date</label>
            <input type="date" id="date" name="date" v-model="article.date">
          </div>
          <div class="form-group">
            <label for="company">Company</label>
            <select id="company" name="company" v-model="article.company" required>
              <option value="">Select Company</option>
              <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
            </select>
          </div>
        </form>
      </template>
      <template v-slot:actions>
        <Button @click="submitForm">Create</Button>
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
import Button from '../Button.vue';

export default {
  name: 'AdminArticle',
  components: {
    Modal,
    QuillEditor,
    Button,
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
    
    this.$store.dispatch('fetchCompanies')
  },
  methods: {
    ...mapActions(['toggleModal', 'setCompanies']),
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
  computed: {
    companies() {
      return this.$store.getters.getCompanies;
    },
  },
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