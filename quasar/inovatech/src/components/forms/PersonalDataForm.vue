<template>
  <q-form
    @submit.prevent=""
    ref="formularioPerfil"
    greedy
    class="q-gutter-lg">

    <q-card-section class="q-gutter-md">

      <EntryBlock
        v-model="formData.first_name"
        label="Nombres"
        field_type="text"
        required
      />

      <EntryBlock
        v-model="formData.first_surname"
        label="Primer apellido"
        field_type="text"
        required
      />

      <EntryBlock
        v-model="formData.second_surname"
        label="Segundo apellido (Opcional)"
        field_type="text"
      />

      <EntryBlock
        v-model="formData.birthdate"
        label="Fecha de nacimiento"
        field_type="date"
      />

      <EntryBlock
        v-model="formData.phone_number"
        label="Número de celular"
        field_type="tel"
        required
      />

      <div class="flex justify-end">
        <q-btn no-caps type="submit" color="primary" label="Guardar"/>
      </div>
    </q-card-section>

  </q-form>

  <div>{{formData}}</div>

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
  first_name: '',
  first_surname: '',
  second_surname: '',
  birthdate: '',
  phone_number: '',
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
