<template>
  <div id="confirmation" :class="`confirmation-${show ? 'on' : 'off'}`">
    <Modal :with-close="false">
      <template v-slot:header>
        <h3>Confirmation</h3>
      </template>
      <template v-slot:default>
        <p>Are you sure you want to proceed?</p>
      </template>
      <template v-slot:actions>
        <Button @click="handleCancel">Cancel</Button>
        <Button type="success" @click="onConfirm">Proceed</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import Button from './Button.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ConfirmationComponent',
  components: {
    Modal,
    Button,
  },
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    document.addEventListener('confirmation-event', this.handleConfirmationEvent);
  },
  methods: {
    ...mapActions(['toggleConfirmModal']),
    handleConfirmationEvent() {
      this.show = true;
    },
    onConfirm() {
      this.getConfirmModal.onConfirm();
      this.toggleConfirmModal();
    },
    handleCancel() {
      this.toggleConfirmModal();
      this.show = false;
    },
  },
  computed: {
    ...mapGetters(['getConfirmModal'])
  },
}
</script>

<style lang="scss">
#confirmation {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1001;
  padding: 1rem;
  width: 100%;
  &.confirmation-off {
    display: block;
  }
}
</style>