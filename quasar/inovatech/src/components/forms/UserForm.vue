<template>
  <q-form
    @submit.prevent="submitForm"
    ref="formularioUsuario"
    greedy
    class="q-gutter-lg">

    <q-card-section class="q-gutter-md">

      <q-item-label class="q-py-sm text-h6 text-weight-regular text-grey-9">Datos de cuenta</q-item-label>

      <EntryBlock
        v-model="formData.correo"
        label="Correo electrónico"
        field_type="email"
        help_text="Dirección de correo que se usará como identificador"
        required
      />

      <EntryBlock
        class="q-pt-md"
        v-model="formData.contrasenia"
        label="Contraseña"
        :type="showPassword ? 'text' : 'password'"
        field_type="password"
        help_text="Ingresa 10 caracteres o más; al menos una letra minúscula, una letra mayúscula, un número y un símbolo"
        required
        @show-password="showPassword = !showPassword"
      />

      <EntryBlock
        class="q-pt-lg"
        v-model="formData.celular"
        label="Número de celular"
        field_type="tel"
        required
      />

      <!-- TODO: Este tiene que ser un radio button, por default es 1 = activo, 0 = inactivo.-->
      <EntryBlock
        v-model="formData.es_activo"
        label="Activo"
        field_type="text"
        required
      />

      <!-- TODO: Este tiene que ser un select, consumido de API, para cuestiones de rápido es un estático con opciones.-->
      <EntryBlock
        v-model="formData.id_rol"
        label="Tipo de usuario"
        field_type="text"
        required
      />

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

const $q = useQuasar()

const siteContext = useContextStore()
const router = useRouter()
const route = useRoute()
siteContext.currentPage = route.path

const {stopAndPrevent} = event
const submitResult = ref([])
const responseStatus = ref(false)
const responseMessage = ref('Error: ')

const showPassword = ref<boolean>(false);

const formData = ref({
  correo: '',
  contrasenia: '',
  celular: '',
  es_activo: '',
  // fecha_registro: '',
  id_rol: '',
})

const showNotification = (
  message: string,
  color: string,
  actions: {
    label: string;
    color: string;
    handler: () => void
  }[] | undefined) => {
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

const submitForm = () => {
  // $q.loading.show({
  //       message: 'Estamos enviando la información. Espere un momento por favor...'
  // })

  // showLoadingBar('Estamos enviando la información. Espere un momento por favor...' )

  //put o post, wherever
  api.post(`/profiles/my/profile/`, formData.value, {
    headers: {
      'Authorization': 'JWT ',
    }
  }).then((response: { status: string | number; }) => {
    if (response.status === 201) {
      responseStatus.value = true
      responseMessage.value = 'Respuesta enviada exitosamente!'
    } else {
      responseMessage.value = responseMessage.value + response.status
    }
    // $q.loading.hide()
    showNotification(response.status === 200 ? 'Usuario actualizado exitosamente' : 'Ocurrió un error: ' + response.status, response.status === 200 ? 'green' : 'red', [])
    setTimeout(() => {
      router.push(response.status === 201 || response.status === 200 ? '/inicio' : '/')
    }, 1000)
  }).catch((error: string) => {
    showNotification('Ocurrió un error' + error, 'red', [
      {
        label: 'Aceptar', color: 'white', handler: () => { /* ... */
        }
      }
    ])
    // $q.loading.hide()
  })
}

</script>
