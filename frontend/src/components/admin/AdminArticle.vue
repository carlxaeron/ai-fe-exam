<template>
  <div id="admin-article">
    <Modal title="Create New Article">
      <template v-slot:default>
        <form @submit.prevent="submitForm">
          <FormGroup id="title" label="Title" v-model="article.title" :value="article.title" :required="true"/>
          <FormGroup id="content" label="Content" :required="true" :value="article.content">
            <template v-slot:etc>
              <QuillEditor v-model:content="article.content" content-type="html" :options="editorOptions" />
            </template>
          </FormGroup>
          <FormGroup id="link" label="Link" v-model="article.link" :value="article.link" :componen-type="link" :required="true" />
          <FormGroup id="image" label="Image" v-model="article.image" :required="true" :value="article.image" :component-type="'input'" :component-props="{ type: 'file', accept: 'image/*' }" />
          <FormGroup id="date" label="Date" v-model="article.date" :value="article.date" :component-type="'input'" :component-props="{ type: 'date' }" :required="true" />
          <FormGroup id="company" label="Company" v-model="article.company" :value="article.company" :component-type="'select'" :required="true">
            <option value="">Select Company</option>
            <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
          </FormGroup>
          <button type="submit" style="display: none;" ref="submitBtn"></button>
        </form>
      </template>
      <template v-slot:actions>
        <Button @click="handleCreate">Create</Button>
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
import { mapActions, mapGetters } from 'vuex';
import apiService from '@/services/apiService';
import Button from '../Button.vue';
import FormGroup from '../FormGroup.vue';

export default {
  name: 'AdminArticle',
  components: {
    Modal,
    QuillEditor,
    Button,
    FormGroup,
  },
  data() {
    return {
      editorOptions: {
        theme: 'snow',
        required: true,
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
      let withError = false;
      Object.keys(this.article).forEach((key) => {
        if (!this.article[key]) {
          withError = key;
        }
      });
      
      if (withError) {
        return this.$store.commit('setNotification', { type: 'error', message: withError.toUpperCase() + ' field are required', show: true });
      }

      // valid link using regex pattern with starts with http or https protocol and ends with a valid domain name
      const linkPattern = /^(http|https):\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
      if (!linkPattern.test(this.article.link)) {
        return this.$store.commit('setNotification', { type: 'error', message: 'Must be a valid link', show: true });
      }

      apiService.createArticle(this.article)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          apiService.handleError(error);
        });
    },
    handleCreate() {
      this.$refs.submitBtn.click();
    },
  },
  computed: {
    ...mapGetters(['getModal']),
    companies() {
      return this.$store.getters.getCompanies;
    },
    modal() {
      return this.getModal;
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