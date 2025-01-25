<template>
  <div :class="`badge ${type}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BadgeComponent',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (value) => {
        return ['primary', 'secondary', 'success', 'danger', 'warning', 'info'].includes(value);
      },
    },
  },
}
</script>

<style lang="scss" scoped>
  .badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    background: var(--primary-color);
    text-align: center;
    &.primary {
      background: var(--primary-color);
    }
    &.secondary {
      background: var(--secondary-color);
    }
    &.success {
      background: var(--success-color);
    }
    &.danger {
      background: var(--danger-color);
    }
    &.warning {
      background: var(--warning-color);
    }
    &.info {
      background: var(--info-color);
    }
  }
</style>