<template>
  <!-- Entry Block -->
  <q-input v-if="field_type === 'text'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           type="text"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [val => !!val || `${label} es requerido`] : ''"
           v-bind="$attrs"
  />
  <q-input v-else-if="field_type === 'email'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           type="email"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [isValidEmail] : ''"
           v-bind="$attrs"
  />
  <q-input v-else-if="field_type === 'tel'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           type="tel"
           unmasked-value
           mask="### ### ####"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [val => !!val && val.length === 10 || `${label} es requerido`] : ''"
           v-bind="$attrs"
  />
  <q-input v-else-if="field_type === 'number'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           type="number"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [val => !!val || `${label} es requerido`] : ''"
           v-bind="$attrs"
  />
  <q-input v-else-if="field_type === 'url'"
           dense
           outlined
           color="dark"
           :label="label"
           prefix="https://"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           type="url"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [val => !!val || `${label} es requerido`] : ''"
           v-bind="$attrs"
  />
  <q-input v-else-if="field_type === 'nomina'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           type="text"
           mask="XXXXX"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [val => !!val && val.length === 5 || `${label} es requerido`] : ''"
           v-bind="$attrs"
  />
  <q-input v-else-if="field_type === 'password'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           :type="required ? 'password' : 'text'"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="[isValidPassword]"
           v-bind="$attrs">
    <template v-slot:append>
      <q-icon
        :name="required ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="$emit('showPassword', !required)"
      />
    </template>
  </q-input>
<!--  <q-input v-else-if="field_type === 'password'"-->
<!--           dense-->
<!--           outlined-->
<!--           color="dark"-->
<!--           :label="label"-->
<!--           :model-value="modelValue"-->
<!--           @input="$emit('update:modelValue', $event.target.value)"-->
<!--           type="password"-->
<!--           :hint="help_text"-->
<!--           :name="label.toLowerCase().replace(' ', '_')"-->
<!--           :rules="required ? [isValidPassword] : ''"-->
<!--           v-bind="$attrs"-->
<!--  />-->
  <!-- Entry Block -->
</template>

<script setup lang="ts">
export interface EntryBlockProps {
  label: string;
  modelValue: never;
  field_type?: string;
  help_text?: string;
  required?: boolean;
  showPassword?: boolean;
}
withDefaults(defineProps<EntryBlockProps>(), {
  field_type: 'text',
  help_text: '',
  required: false,
});

const emailPattern = /^(?=[a-zA-Z0-9@.%+-]{6,254}$)[a-zA-Z0-9.%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})/;

const isValidEmail = (val: string) => {
  if (!!val) {
    return emailPattern.test(val) || 'El correo electrónico no tiene formato correcto';
  } else {
    return 'Correo electrónico es requerido'
  }
}

const isValidPassword = (val: string) => {
  if (!!val) {
    return passwordPattern.test(val) || 'La contraseña no cumple con los requisitos';
  } else {
    return 'Contraseña obligatoria'
  }
}
</script>
