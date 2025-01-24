<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <component
      v-if="!haslot"
      :is="componentType"
      :id="id"
      :required="required"
      v-bind="componentProps"
      :value="value"
      @focus="touched = true"
      @blur="touched = true"
      @input="handleInput"
    >
      <slot></slot>
    </component>
    <span v-if="required && touched && !valid" class="validation-error">This field is required.</span>
    <slot name="etc" v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    componentType: {
      type: String,
      default: 'input',
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Object],
      default: '',
      required: true,
    },
  },
  data() {
    return {
      touched: false,
      valid: false,
    };
  },
  computed: {
    haslot() {
      return !!this.$slots.etc;
    },
  },
  methods: {
    handleInput(event) {
      const value = event.target ? event.target.value : event;
      this.$emit('update:modelValue', value);
      this.validate(value);
    },
    validate(value) {
      if (this.required && this.touched && value) {
        this.valid = true;
      } else if (this.required && this.touched && !value) {
        this.valid = false;
      }
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.validate(value);
      },
    },
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  input, select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
  }
  label {
    margin-bottom: 0.5rem;
  }
}
.validation-error {
  color: $red-1;
  font-size: 0.875rem;
}
</style>