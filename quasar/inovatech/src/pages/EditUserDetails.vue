<template>
  <q-page class="row items-start justify-evenly" style="max-width: 1000px; margin: 0 auto;">
    <div class="col-12 col-md-10 col-lg-10" v-bind:class="$q.screen.lt.sm ? 'q-py-md' : 'q-pa-xl'">
      <div class="text-center">
        <p style="font-size: 30px; margin: 0 0 2px 0;">Editar usuario</p>
        <p class="text-grey-8" style="font-size: 0.875rem; font-weight: 400;">Asegúrate que tus datos sean correctos</p>
      </div>

      <div class="row justify-center align-center">
            <div class="col-xs-12">
              <div class="q-py-sm">

                <q-form
                  @submit.prevent="editUserForm"
                  ref="formulario"
                  greedy
                  class="q-gutter-lg">

                  <q-card-section v-show="!is_loading" class="q-gutter-md">

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

                </q-form>

                <div v-show="is_loading" class="q-gutter-md q-px-md q-mt-xl">
                  <q-skeleton class="q-mb-xl" style="height: 30px; width: 40%" square />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                  <q-skeleton class="q-mb-xl" style="height: 40px;" bordered />
                </div>

            <q-inner-loading :showing="is_loading">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>

              </div>
            </div>
          </div>

    </div>

  </q-page>
</template>

<script setup lang="ts">
import {ref, onBeforeMount} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {useQuasar, event} from 'quasar'
import {api} from 'boot/axios'
import {useAuthStore} from 'stores/auth';
import {useContextStore} from 'stores/SiteContextStore'

import EntryBlock from 'components/inputs/EntryBlock.vue';
import DateBlock from 'components/inputs/DateBlock.vue';

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const siteContext = useContextStore()
siteContext.currentPage = route.path

// const {stopAndPrevent} = event
// const submitResult = ref([])
// const responseStatus = ref(false)
// const responseMessage = ref('Error: ')

const is_loading = ref(true)
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
      response.data.value.forEach(function (obj: { label: any; nombre: any; value: any; id_rol: any; }) {
        obj.label = obj.nombre
        delete obj.nombre
        obj.value = obj.id_rol
        delete obj.id_rol
      })
      rolesOptions.value = response.data.value
    })
  }, 1000)
})

const editUserForm = () => {
  showLoadingBar('Estamos enviando la información. Espere un momento por favor...' )

  api.put(`/Usuario/ActualizarUsuario/${route.params.id}/`, formData.value, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
    }
  }).then((response) => {
    $q.loading.hide()

    showNotification(response.status === 200 || response.status === 201
      ? response.data.value
      : 'Ocurrió un error: ' + response.status, response.status === 200 || response.status === 201
      ? 'green' : 'red', [])

    setTimeout(() => {
      router.push(response.status === 201 || response.status === 200 ? '/user-management' : '/')
    }, 1000)
  }).catch((error: string) => {
    showNotification('Ocurrió un error' + error, 'red', [{label: 'Aceptar', color: 'white', handler: () => { /* ... */}}])
    $q.loading.hide()
  })
}

onBeforeMount(() => {
  setTimeout(() => {
    if (route.params.id) {
      api.get(`/Usuario/ConsultarUsuario/${route.params.id}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
          }
        }
        ).then(response => {
          is_loading.value = false;
          formData.value = response.data.value[0];
      }).catch((error: string) => {
        console.log(error)
      })
    }
  }, 1000)
})
</script>
