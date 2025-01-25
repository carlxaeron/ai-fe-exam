<template>
  <div :class="`form-group ${loading || disabled ? 'frm-disabled' : ''}`">
    <label :for="id">{{ label }}</label>
    <DateTime v-if="isDateTime && !haslot" 
      :disabled="loading" 
      :value="value" 
      @input="handleInput"
      :required="required"
      @focus="touched = true"
      @blur="touched = true"
      :id="id"
      />
    <component
      v-else-if="!haslot"
      :is="componentType"
      :id="id"
      :required="required"
      v-bind="componentProps"
      :value="value"
      @focus="touched = true"
      @blur="touched = true"
      @input="handleInput"
      :disabled="loading"
    >
      <slot></slot>
    </component>
    <span v-if="required && touched && !valid" class="validation-error">This field is required.</span>
    <slot name="etc" v-else></slot>
  </div>
</template>

<script>
import DateTime from './DateTime.vue';

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
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    isDateTime() {
      return this.componentProps.type === 'datetime';
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

    console.log(this.componentProps, this, 'parent mounted');
  },
  components: {
    DateTime,
  },
};
</script>

<style lang="scss">
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
  &.frm-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
.validation-error {
  color: $red-1;
  font-size: 0.875rem;
}
</style>