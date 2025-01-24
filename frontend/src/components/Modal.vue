<template>
  <div v-show="isShow" id="modal-container" :class="`modal-appear modal-size-${size}`">
    <div id="modal">
      <h2>{{ title }}</h2>
      <div id="modal-content">
        <slot name="default"></slot>
      </div>
      <div id="modal-actions">
        <slot name="actions"></slot>
      </div>
      <button id="modal-close" @click="handleClose">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ModalComponent',
  props: {
    show: {
      type: Boolean,
    },
    size: {
      type: String,
      default: 'md',
    },
    title: {
      type: String,
      default: 'Modal',
    },
  },
  computed: {
    ...mapGetters(['getModal']),
    isShow() {
      return this.show || this.getModal.show;
    },
  },
  components: {

  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));
    if(this.$props.show || this.getModal.show) {
      document.body.style.overflow = 'hidden';
    }
  },
  unmounted() {
    document.body.style.overflow = 'auto';
  },
  methods: {
    ...mapActions(['toggleModal']),
    handleClose() {
      this.toggleModal();
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/_variables.scss';

  h2 {
    margin-bottom: 1rem;
  }
  #modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    &.modal-size-md {
      #modal {
        width: 70%;
        @media screen and (min-width: #{$md}) {
          width: 800px;
        }
        @media screen and (max-width: #{$md}) {
          width: 90%;
        }
      }
    }
    &.modal-appear {
      animation: modal-appear 0.3s ease;
    }
  }
  @keyframes modal-appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  #modal {
    background: var(--secondary-color);
    padding: 2rem;
    border-radius: 0.5rem;
    position: relative;
  }
  #modal-content {
    max-height: 80vh;
    overflow: auto;
  }
  #modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 1.5rem;
    cursor: pointer;
  }
  #modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
</style>