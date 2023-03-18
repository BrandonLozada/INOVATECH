<template>
  <q-form
    @submit.prevent=""
    ref="formularioDomicilio"
    greedy
    class="q-gutter-lg">

    <q-card-section class="q-gutter-md">

      <q-item-label class="q-py-sm text-h6 text-weight-regular text-grey-9">Domicio del empleado</q-item-label>

      <EntryBlock
        v-model="formData.calle"
        label="Calle"
        field_type="text"
        required
      />

      <EntryBlock
        v-model="formData.numero_exterior"
        label="Número exterior"
        field_type="text"
        required
      />

      <!-- TODO: Corregir el vue warning de las rules, quitando el string que se manda con un array al mandar o no un required -->
      <EntryBlock
        v-model="formData.numero_interior"
        label="Número interior (Opcional)"
        field_type="text"
      />

      <!-- TODO: Corregir el vue warning de las rules, quitando el string que se manda con un array al mandar o no un required -->
      <EntryBlock
        v-model="formData.entre_calles"
        label="Entre calles (Opcional)"
        field_type="text"
      />

      <EntryBlock
        v-model="formData.codigo_postal"
        label="Código postal"
        field_type="text"
        required
      />

      <!-- TODO: Poner un select para los tres siguientes; colonia, ciudad y estado. -->
      <EntryBlock
        v-model="formData.colonia"
        label="Colonia"
        field_type="text"
        required
      />

      <EntryBlock
        v-model="formData.ciudad"
        label="Ciudad"
        field_type="text"
        required
      />

      <EntryBlock
        v-model="formData.estado"
        label="Estado"
        field_type="text"
        required
      />

      <div class="flex justify-end">
        <q-btn no-caps type="submit" color="primary" label="Guardar"/>
      </div>
    </q-card-section>

  <div>{{formData}}</div>

  </q-form>

</template>

<script setup lang="ts">
import {ref} from 'vue';
import {api, axios} from 'boot/axios'
import {useQuasar, event, date} from 'quasar'
import {useRouter, useRoute} from 'vue-router'
import {useContextStore} from 'stores/SiteContextStore'
import EntryBlock from 'components/inputs/EntryBlock.vue';

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
  calle: '',
  numero_interior: '',
  numero_exterior: '',
  entre_calles: '',
  codigo_postal: '',
  colonia: '',
  ciudad: '',
  estado: '',
  // pais: '',
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
