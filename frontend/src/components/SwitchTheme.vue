<template>
  <div class="switch-theme">
    <button @click="toggleTheme">Toggle Theme</button>
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