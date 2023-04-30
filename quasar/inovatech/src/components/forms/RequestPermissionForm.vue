<template>
  <q-form
    @submit.prevent="submitForm"
    ref="formulario"
    greedy
    class="q-gutter-lg">

    <q-card-section class="q-gutter-md">

      <q-item-label class="q-py-sm text-h6 text-weight-regular text-grey-9">Solicitud de permiso</q-item-label>

      <q-select
        v-model="formData.id_permiso"
        dense
        outlined
        label="Tipo de permiso"
        :options="typePermissionOptions"
        type="text"
        emit-value
        map-options
        :rules="[ val => val || 'Campo requerido']"
      />

      <TextareaBlock
        v-model="formData.motivo"
        label="Motivo del permiso"
        field_type="textarea"
        required
      />

      <q-item-label class="q-pl-xs text-h7 text-weight-regular text-grey-8">
        Selecciona el periodo que deseas de tu permiso
      </q-item-label>

      <DateBlock
        v-model="formData.fecha_inicio"
        label="Fecha de inicio del permiso"
        field_type="date"
        required
      />

      <DateBlock
        v-model="formData.fecha_fin"
        label="Fecha de fin del permiso"
        field_type="date"
        required
      />

      <div class="flex justify-end">
        <q-btn no-caps type="submit" color="primary" label="Guardar" :disable="formData.id_permiso === '' || formData.fecha_inicio === '' || formData.fecha_fin === ''"/>
      </div>
    </q-card-section>

  </q-form>
</template>

<script setup lang="ts">
import {useQuasar, event} from 'quasar'
import {ref, onBeforeMount} from 'vue';
import {api} from 'boot/axios'
import {useRouter, useRoute} from 'vue-router'
import {useContextStore} from 'stores/SiteContextStore'
import EntryBlock from 'components/inputs/EntryBlock.vue';
import TextareaBlock from 'components/inputs/TextareaBlock.vue';
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

const showPassword = ref<boolean>(false);
const typePermissionOptions = ref([])

//id_usuario_solicitante

const formData = ref({
  id_usuario_solicitante: 2,
  id_permiso: '',
  motivo: '',
  fecha_inicio: '',
  fecha_fin: '',
  id_usuario_autorizador: 2
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

onBeforeMount(() => {
  setTimeout(() => {
    api.get('/TipoPermiso/ListarTodo/').then(response => {
      console.log('response.data', response.data);
      response.data.value.forEach(function (obj: { label: never; nombre: never; value: never; id_tipo_permiso: never; }) {
        obj.label = obj.nombre
        delete obj.nombre
        obj.value = obj.id_tipo_permiso
        delete obj.id_tipo_permiso
      })
      typePermissionOptions.value = response.data.value
      console.log('typePermissionOptions', typePermissionOptions.value)
    })
  }, 1000)
})

const submitForm = () => {
  showLoadingBar('Estamos enviando la información. Espere un momento por favor...' )

  api.post('/Permiso/GuardarPermiso/', formData.value, {
    headers: {
      // 'Authorization': 'JWT ',
    }
  }).then((response: { status: string | number; }) => {

    // Esto es para dev mode.
    if (response.status === 200 || response.status === 201) {
      responseStatus.value = true
      responseMessage.value = 'Respuesta enviada exitosamente'
    } else {
      responseMessage.value = responseMessage.value + response.status
    }
    $q.loading.hide()

    // Esto es para experiencia del usuario.
    showNotification(response.status === 200
      ? 'Solicitud creada exitosamente'
      : 'Ocurrió un error: ' + response.status, response.status === 200
      ? 'green' : 'red', [])

    setTimeout(() => {
      router.push(response.status === 201 || response.status === 200 ? '/' : '/')
    }, 2000)
  }).catch((error: string) => { // Para ambos y si hubo otro tipo de error.
    showNotification('Ocurrió un error' + error, 'red', [
      {
        label: 'Aceptar', color: 'white', handler: () => { /* ... */
        }
      }
    ])
    $q.loading.hide()
  })
}
</script>
