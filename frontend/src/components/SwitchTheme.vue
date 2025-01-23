<template>
  <div class="switch-theme">
    <button @click="toggleTheme">
      <i class="fas fa-adjust"></i>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SwitchThemeComponent',
  methods: {
    ...mapActions(['toggleTheme'])
  }
}
</script>

<style lang="scss" scoped>
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.5rem;
    i {
      font-size: 1rem;
      color: var(--primary-color);
    }
  }
</style>