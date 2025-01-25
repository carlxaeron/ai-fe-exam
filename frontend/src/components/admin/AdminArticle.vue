<template>
  <div id="admin-article">
    <Modal :title="getTitle()" @onClose="close">
      <template v-slot:default>
        <form @submit.prevent="submitForm">
          <FormGroup id="title" label="Title" v-model="article.title" :value="article.title" :required="true"/>
          <FormGroup id="content" label="Content" :required="true" :value="article.content">
            <template v-slot:etc>
              <QuillEditor v-model:content="article.content" content-type="html" :options="editorOptions" />
            </template>
          </FormGroup>
          <FormGroup id="link" label="Link" v-model="article.link" :value="article.link" :componen-type="link" :required="true" />
          <FormGroup :loading="image.uploading" id="image" label="Image" v-model="article.image" :required="isEdit ? false : true">
            <template v-slot:etc>
              <input type="file" ref="image" :required="isEdit ? false : true" accept="image/*" @change="handleImage"/>
              <div id="article-img" v-if="article.image">
                <img :src="article.image" alt="Article Image" />
              </div>
            </template>
          </FormGroup>
          <FormGroup id="date" label="Date" v-model="article.date" :value="article.date" :component-type="'input'" :component-props="{ type: 'datetime' }" :required="true" />
          <FormGroup id="company" label="Company" v-model="article.company" :value="article.company" :component-type="'select'" :required="true">
            <option value="">Select Company</option>
            <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
          </FormGroup>
          <button type="submit" style="display: none;" ref="submitBtn"></button>
        </form>
      </template>
      <template v-slot:actions>
        <Button v-if="!isEdit" @click="handleCreate">Create</Button>
        <template v-else>
          <Button @click="handleSave">Save</Button>
          <Button type="success" @click="handlePublish">Publish</Button>
        </template>
      </template>
    </Modal>
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
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/services/firebase';

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
        date: this.getCurrentDateTime(),
        image: '',
      },
      image: {
        file: null,
        url: '',
        uploading: false,
      },
      action: 'create',
    }
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));
    
    this.$store.dispatch('fetchCompanies');

    if (this.getArticle) {
      this.article = {
        ...this.getArticle,
      };
    }
  },
  methods: {
    ...mapActions(['setCompanies', 'getArticle']),
    getCurrentDateTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const time = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      return time;
    },
    getTitle() {
      return this.isEdit ? 'Edit "' + this.getArticle.title + '"' : 'Create Article';
    },
    close() {
      this.resetForm();
      this.$store.dispatch('showAdminArticle', false);
    },
    resetForm() {
      this.article = {
        title: '',
        link: '',
        content: '',
        company: '',
        date: this.getCurrentDateTime(),
        image: '',
      };
      this.$store.dispatch('setArticle', null);
    },
    handleImage(event) {
      this.article.image = '';
      this.imagefile = null;

      if (event.target.files.length > 0) {
        // const storage = getStorage(app);
        const file = event.target.files[0];
        this.image.file = file;

        const newFileName = new Date().getTime() + 
        Math.random().toString(36).substring(2) +
        '-' + file.name;

        const storageRef = ref(storage, 'images/' + newFileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        this.image.uploading = true;

        const onSuccess = () => {
          console.log('File uploaded successfully');
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.article.image = downloadURL;
            this.image.uploading = false;
          });
        };

        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'running':
                // Handle running state
                break;
              case 'paused':
                // Handle paused state
                break;
              case 'success':
                // Handle successful uploads
                console.log('File uploaded successfully');
                onSuccess();
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error('Upload failed:', error);

            this.$store.commit('setNotification', { type: 'error', message: 'Image upload failed', show: true });
            this.image.uploading = false;
          },
          () => {
            // Handle successful uploads
            onSuccess();
          }
        );
      }
    },
    submitForm() {
      const formData = new FormData();
      let withError = false;
      Object.keys(this.article).forEach((key) => {
        if (!this.article[key] && key !== 'writer' && key !== 'editor') {
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

      if (this.image.uploading) {
        return this.$store.commit('setNotification', { type: 'error', message: 'Image is uploading', show: true });
      }

      if ((!this.image.file || !this.image.file.name || !this.image.file.size) && !this.isEdit) {
        return this.$store.commit('setNotification', { type: 'error', message: 'Image is required', show: true });
      }

      formData.append('title', this.article.title);
      formData.append('link', this.article.link);
      formData.append('content', this.article.content);
      formData.append('company', this.article.company);
      formData.append('date', this.article.date);
      formData.append('image', this.article.image);

      // Create article
      if (this.action === 'create') {
        this.createArticle(formData);
      } else if (this.action === 'save') {
        this.$store.dispatch('toggleConfirmModal', {
          onConfirm: () => {
            this.saveArticle(formData);
          }
        });
      }
    },
    handleCreate() {
      this.action = 'create';
      this.$refs.submitBtn.click();
    },
    handleSave() {
      this.action = 'save';
      this.$refs.submitBtn.click();
    },
    handlePublish() {

    },

    // API calls
    createArticle(formData) {
      apiService.createArticle(formData)
        .then((response) => {
          if(response.status === 201) {
            this.$store.commit('setNotification', { type: 'success', message: 'Article created successfully', show: true });
            this.$store.dispatch('showAdminArticle', false);
            this.resetForm();
            this.$store.dispatch('fetchGlobalArticles');
          }
        })
        .catch((error) => {
          apiService.handleError(error);
        });
    },
    saveArticle(formData) {
      apiService.updateArticle(this.getArticle.id, formData)
        .then((response) => {
          if(response.status === 200) {
            this.$store.commit('setNotification', { type: 'success', message: 'Article saved successfully', show: true });
            this.$store.dispatch('showAdminArticle', false);
            this.resetForm();
            this.$store.dispatch('fetchGlobalArticles');
          }
        })
        .catch((error) => {
          apiService.handleError(error);
        });
    },
  },
  computed: {
    ...mapGetters(['getModal', 'getArticle']),
    companies() {
      return this.$store.getters.getCompanies;
    },
    modal() {
      return this.getModal;
    },
    isEdit() {
      return this.getArticle;
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/_variables.scss";

  #article-img {
    margin-top: 1rem;
    img {
      max-width: 100%;
      height: auto;
    }
  }
</style>