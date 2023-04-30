<template>
  <!-- Textarea Block -->
  <q-input v-if="field_type === 'textarea'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           type="textarea"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [val => !!val || `${label} es requerido`] : ''"
           v-bind="$attrs"
  />
  <q-input v-else-if="field_type === 'autogrow'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           autogrow
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [val => !!val || `${label} es requerido`] : ''"
           v-bind="$attrs"
  />
  <!-- Textarea Block -->
</template>

<script setup lang="ts">
export interface TextareaBlockProps {
  label: string;
  modelValue: never;
  field_type?: string;
  help_text?: string;
  required?: boolean;
}
withDefaults(defineProps<TextareaBlockProps>(), {
  field_type: 'text',
  help_text: '',
  required: false,
});
</script>
