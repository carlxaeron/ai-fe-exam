<template>
  <div id="admin-article">
    <Modal>
      <div>123</div>
    </Modal>
    <button title="Create Article" id="create-admin-article-btn" @click="handleCreateArticle">
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>
import Modal from '../Modal.vue';
import { mapActions } from 'vuex';

export default {
  name: 'AdminArticle',
  components: {
    Modal,
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  methods: {
    ...mapActions(['toggleModal']),
    handleCreateArticle() {
      this.toggleModal();
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/_variables.scss";

  #admin-article {

  }
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