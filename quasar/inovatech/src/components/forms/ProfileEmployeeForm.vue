<template>
  <q-form
    @submit.prevent=""
    ref="formularioPerfilEmpleado"
    greedy
    class="q-gutter-lg">

    <q-card-section class="q-gutter-md">

      <q-item-label class="q-py-sm text-h6 text-weight-regular text-grey-9">Datos personales</q-item-label>

      <EntryBlock
        v-model="formData.nombre"
        label="Nombres"
        field_type="text"
        required
      />

      <EntryBlock
        v-model="formData.primer_apellido"
        label="Primer apellido"
        field_type="text"
        required
      />

      <!-- TODO: Corregir el vue warning de las rules, quitando el string que se manda con un array al mandar o no un required -->
      <EntryBlock
        v-model="formData.segundo_apellido"
        label="Segundo apellido (Opcional)"
        field_type="text"
      />

      <DateBlock
        v-model="formData.fecha_nacimiento"
        label="Fecha de nacimiento"
        field_type="birthdate"
        required
      />

      <!-- TODO: Debe ser un radio button, para rápido es texto, M = Masculino y F = Femenino -->
      <EntryBlock
        v-model="formData.sexo"
        label="Sexo"
        field_type="text"
        required
      />

      <q-item-label class="q-py-sm text-h6 text-weight-regular text-grey-9">Información laboral</q-item-label>

      <EntryBlock
        v-model="formData.nomina"
        label="Número de nómina"
        field_type="nomina"
        help_text="Ingresa la nómina asignada al empleado"
        required
      />

      <DateBlock
        v-model="formData.fecha_ingreso"
        label="Fecha de ingreso"
        field_type="date"
        required
      />

      <!-- TODO: Corregir el vue warning de las rules, quitando el string que se manda con un array al mandar o no un required -->
      <DateBlock
        v-model="formData.fecha_egreso"
        label="Fecha de egreso (Opcional)"
        field_type="date"
        help_text="En caso de que el empleado esté inactivo"
      />

      <!-- TODO: Este tiene que ser un select, consumido de API, para cuestiones de rápido es un estático con opciones. -->
      <EntryBlock
        v-model="formData.id_puesto"
        label="Puesto"
        field_type="text"
        required
      />

      <!-- TODO: Este tiene que ser un select, consumido de API, para cuestiones de rápido es un estático con opciones. -->
      <EntryBlock
        v-model="formData.id_departamento"
        label="Departamento asignado"
        field_type="text"
        required
      />

      <!-- TODO: Este tiene que ser un select, consumido de API, para cuestiones de rápido es un estático con opciones. -->
<!--      <EntryBlock-->
<!--        v-model="formData.id_jefe"-->
<!--        label="Jefe encargado"-->
<!--        field_type="text"-->
<!--        required-->
<!--      />-->

      <div class="flex justify-end">
        <q-btn no-caps type="submit" color="primary" label="Guardar"/>
      </div>
    </q-card-section>

    {{ formData }}

  </q-form>

</template>

<script setup lang="ts">
import {ref} from 'vue';
import {api, axios} from 'boot/axios'
import {useQuasar, event, date} from 'quasar'
import {useRouter, useRoute} from 'vue-router'
import {useContextStore} from 'stores/SiteContextStore'
import EntryBlock from 'components/inputs/EntryBlock.vue';
import DateBlock from 'components/inputs/DateBlock.vue';

const $q = useQuasar()
const siteContext = useContextStore()
const router = useRouter()
const route = useRoute()
siteContext.currentPage = route.path

const {stopAndPrevent} = event
const submitResult = ref([])
const responseStatus = ref(false)
const responseMessage = ref('Error: ')

const formData = ref({
  nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  fecha_nacimiento: '',
  sexo: '',
  nomina: '',
  fecha_ingreso: '',
  fecha_egreso: '',

  id_puesto: '',
  id_departamento: '',
  // id_jefe: '',
})

const showNotification = (
  message: string,
  color: string,
  actions: {
    label: string;
    color: string;
    handler: () => void }[] | undefined) => {
  $q.notify({
        message: message,
        color: color,
        actions: actions
  })
}

const showLoadingBar = (message: string) => {
  $q.loading.show({
    message: message
  })
}
</script>
