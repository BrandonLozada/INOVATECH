<template>
  <!-- Date Block -->
  <q-input v-if="field_type === 'birthdate'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           @update:modelValue="$refs.qDateProxy"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [isValidDate, isOldEnough] : ''"
           v-bind="$attrs"
           mask="date"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          cover
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            color="dark"
            text-color="white"
            :model-value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
          >
            <div class="row items-center justify-end">
              <q-btn
                flat
                v-close-popup
                label="Listo"
                color="dark"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>

  <q-input v-else-if="field_type === 'date'"
           dense
           outlined
           color="dark"
           :label="label"
           :model-value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           @update:modelValue="$refs.qDateProxy"
           :hint="help_text"
           :name="label.toLowerCase().replace(' ', '_')"
           :rules="required ? [isValidDate] : ''"
           v-bind="$attrs"
           mask="date"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          cover
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            color="dark"
            text-color="white"
            :model-value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
          >
            <div class="row items-center justify-end">
              <q-btn
                flat
                v-close-popup
                label="Listo"
                color="dark"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
  <!-- Date Block -->
</template>

<script setup lang="ts">
export interface DateBlockProps {
  label: string;
  modelValue: never;
  field_type?: string;
  help_text?: string;
  required?: boolean;
}
withDefaults(defineProps<DateBlockProps>(), {
  field_type: 'birthdate',
  help_text: '',
  required: false,
});

const datePattern = /^(\d{4})(\/)(0[1-9]|1[012])\2(0[1-9]|[1-2]\d|3[01])$/

const isValidDate = (val: string) => {
  if (!!val && val !== '') {

    const result = val.match(datePattern)
    if (!result) {
      return 'La fecha no tiene formato';
    }

    const monthDays = new Date(parseInt(result[1]), parseInt(result[3]), 0).getDate();
    if (parseInt(result[4]) > monthDays) {
      return 'La fecha es inválida';
    }

  } else {
    return 'Fecha es requerido';
  }
};

const isOldEnough = (val: string) => {
  const today = new Date();
  const birthdate = new Date(val);
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age >= 18 || 'El empleado debe tener 18 o más años cumplidos';
};
</script>
