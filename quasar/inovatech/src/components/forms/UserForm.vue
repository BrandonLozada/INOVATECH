<template>
  <q-form
    @submit.prevent="submitForm"
    ref="formulario"
    greedy
    class="q-gutter-lg">

    <q-card-section class="q-gutter-md">

      <q-item-label class="q-py-sm text-h6 text-weight-regular text-grey-9">Datos de cuenta</q-item-label>

      <EntryBlock
        v-model="formData.nombre"
        label="Nombre"
        field_type="text"
        required
      />

      <EntryBlock
        v-model="formData.primer_apellido"
        label="Primer apellido"
        field_type="text"
        required
      />

      <EntryBlock
        v-model="formData.segundo_apellido"
        label="Segundo apellido"
        field_type="text"
        required
      />

      <DateBlock
        v-model="formData.fecha_nacimiento"
        label="Fecha de nacimiento"
        field_type="birthdate"
        required
      />

      <q-item-label class="q-pl-xs text-h7 text-weight-regular text-grey-8">
        Selecciona tu sexo
      </q-item-label>

      <q-option-group
        v-model="formData.sexo"
        :options="genderOptions"
        color="black"
        inline
      />

      <EntryBlock
        v-model="formData.celular"
        label="Número de celular"
        field_type="tel"
        required
      />

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

      <q-item-label class="q-pt-lg q-pl-xs text-h7 text-weight-regular text-grey-8">
        Estado de actividad del usuario
      </q-item-label>

      <q-option-group
        v-model="formData.es_activo"
        :options="activeOptions"
        color="black"
        inline
      />

      <q-select
        v-model="formData.id_rol"
        dense
        outlined
        label="Rol de usuario"
        :options="rolesOptions"
        type="text"
        emit-value
        map-options
        :rules="[ val => val || 'Campo requerido']"
      />

      <div class="flex justify-end">
        <q-btn no-caps type="submit" color="primary" label="Guardar" :disable="formData.sexo === ''"/>
      </div>
    </q-card-section>

      {{ formData }}

  </q-form>
</template>

<script setup lang="ts">
import {useQuasar, event} from 'quasar'
import {ref, onBeforeMount} from 'vue';
import {api} from 'boot/axios'
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

const showPassword = ref<boolean>(false);
const rolesOptions = ref([])
const activeOptions = [
  {
    label: 'Activo',
    value: 1
  },
  {
    label: 'Inactivo',
    value: 0
  }
]
const genderOptions = [
  {
    label: 'M',
    value: 'M'
  },
  {
    label: 'F',
    value: 'F'
  }
]

const formData = ref({
  nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  fecha_nacimiento: '',
  sexo: '',
  celular: '',
  correo: '',
  contrasenia: '',
  es_activo: 1,
  id_rol: ''
})

  //q.notify('Message')
  // or with a config object:
  // $q.notify({...})

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
    api.get('/Rol/ListarTodo/').then(response => {
      console.log('response.data', response.data);
      response.data.value.forEach(function (obj: { label: any; nombre: any; value: any; id_rol: any; }) {
        obj.label = obj.nombre
        delete obj.nombre
        obj.value = obj.id_rol
        delete obj.id_rol
      })
      rolesOptions.value = response.data.value
      console.log('rolesOptions', rolesOptions.value)
    })

  // api.get('/Rol/ListarTodo/').then(response => {
  //   rolesOptions.value = response.data.value
  //   console.log('rolesOptions', rolesOptions.value)
  // }).catch(() => rolesOptions.value = null)
  }, 1000)
})

const submitForm = () => {
  showLoadingBar('Estamos enviando la información. Espere un momento por favor...' )

  api.post('/Usuario/GuardarUsuario/', formData.value, {
    headers: {
      // 'Authorization': 'JWT ',
    }
  }).then((response: { status: string | number; }) => {
    if (response.status === 201) {
      responseStatus.value = true
      responseMessage.value = 'Respuesta enviada exitosamente!'
    } else {
      responseMessage.value = responseMessage.value + response.status
    }
    $q.loading.hide()
    showNotification(response.status === 200
      ? 'Usuario actualizado exitosamente'
      : 'Ocurrió un error: ' + response.status, response.status === 200
      ? 'green' : 'red', [])

    setTimeout(() => {
      router.push(response.status === 201 || response.status === 200 ? '/inicio' : '/')
    }, 2000)
  }).catch((error: string) => {
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
