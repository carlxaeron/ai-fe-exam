<template>
  <div id="confirmation" :class="`confirmation-${show ? 'on' : 'off'}`">
    <Modal :show="showModal" :with-close="false" :size="'sm'" @onClose="() => {}">
      <template v-slot:header>
        <h3>{{ title }}</h3>
      </template>
      <template v-slot:default>
        <p>{{ message }}</p>
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

export default {
  name: 'ConfirmationComponent',
  components: {
    Modal,
    Button,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Confirmation',
    },
    message: {
      type: String,
      default: 'Are you sure you want to proceed?',
    },
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
  emits: ['onConfirm', 'onCancel'],
  methods: {
    onConfirm() {
      this.$emit('onConfirm');
    },
    handleCancel() {
      this.$emit('onCancel');
    },
  },
  watch: {
    show(val) {
      this.showModal = val;
    }
  },
  data() {
    return {
      showModal: false,
    };
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
    display: none;
  }
}
</style>