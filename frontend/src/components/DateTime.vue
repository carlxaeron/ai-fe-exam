<template>
  <div id="datetime">
    <input
      type="datetime-local"
      v-bind="componentProps"
      :value="value"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'DateTimeComponent',
  props: {
    value: {
      type: String,
      default: '',
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
    componentType: {
      type: String,
      default: 'input',
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
}
</script>

<style lang="scss">
#datetime {
  input {
    width: 100%;
    padding: 0.5rem;
  }
}
</style>