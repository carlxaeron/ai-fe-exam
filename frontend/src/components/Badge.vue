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

<style>
  .badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    background: var(--primary-color);
  }
  .badge.primary {
    background: var(--primary-color);
  }
  .badge.secondary {
    background: var(--secondary-color);
  }
  .badge.success {
    background: var(--success-color);
  }
  .badge.danger {
    background: var(--danger-color);
  }
  .badge.warning {
    background: var(--warning-color);
  }
  .badge.info {
    background: var(--info-color);
  }
</style>