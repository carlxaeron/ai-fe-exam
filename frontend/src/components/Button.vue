<template>
  <button :class="`btn ${type}`">
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.btn {
  background-color: $blue-1;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: $blue-2;
  }
  &.success {
    background-color: $green-1;
    &:hover {
      background-color: $green-2;
    }
  }
  &.danger {
    background-color: $red-1;
    &:hover {
      background-color: $red-2;
    }
  }
  &.warning {
    background-color: $yellow-1;
    &:hover {
      background-color: $yellow-2;
    }
  }
  &.info {
    background-color: $blue-1;
    &:hover {
      background-color: $blue-2;
    }
  }
}
</style>