<template>
  <div  class="row items-center justify-evenly" style="max-width: 1100px; margin: 0 auto;">
    <div class="col-12 col-md-10 col-lg-10" v-bind:class="$q.screen.lt.sm ? 'q-py-md' : 'q-pa-xl'">
      <div class="text-center">
        <p style="font-size: 30px; margin: 0 0 2px 0;">Completa el formulario</p>
        <p class="text-grey-8" style="font-size: 0.875rem; font-weight: 400;">Asegúrate que tus datos sean correctos</p>
      </div>
          <div class="row justify-center align-center">
            <div class="col-xs-12">
              <div class="q-py-sm">

                <q-form
                    @submit.prevent="submitForm"
                    ref="formularioPerfilEmpleado"
                    greedy
                    class="q-gutter-lg">

                    <q-card-section class="q-gutter-md">

                      <q-item-label class="q-py-sm text-h6 text-weight-regular text-grey-9">Datos de identificación</q-item-label>

                      <EntryBlock
                        v-model="formData.CURP"
                        label="CURP"
                        field_type="CURP"
                        length_field=8
                        required
                      />

                      <EntryBlock
                        v-model="formData.RFC"
                        label="RFC"
                        field_type="RFC"
                        required
                      />

                      <EntryBlock
                        v-model="formData.NSS"
                        label="NSS"
                        field_type="NSS"
                        required
                      />

                      <EntryBlock
                        v-model="formData.infonavit"
                        label="Número crédito Infonavit"
                        field_type="INFONAVIT"
                        help_text="Ingresa el número de crédito en caso de contar con retenciones de Infonavit"
                      />

                      <!-- TODO: Todos los select mandarlos a componentes reutilizables de tipo SelectBlock
                                 también separarlos como de tipo emit-value, map-options, normales, filtering, etc.-->
                      <q-select
                        v-model="formData.estado_civil"
                        dense
                        outlined
                        label="Estado civil"
                        :options="maritalStatusOptions"
                        type="text"
                        emit-value
                        map-options
                        :rules="[ val => val || 'Campo requerido']"
                      />

                      <q-item-label class="q-py-sm text-h6 text-weight-regular text-grey-9">Datos laborales</q-item-label>

                      <EntryBlock
                        v-model="formData.nomina"
                        label="Número de nómina"
                        field_type="nomina"
                        help_text="Ingresa la nómina asignada al empleado"
                        required
                      />

                      <!-- TODO: Corregir esta parte del punto decimal y el tipo de componente EntryBlock -->
                      <EntryBlock
                        v-model="formData.salario"
                        label="Salario mensual"
                        field_type="text"
                        help_text="Ingresa el salario mensual sin punto decimal"
                        required
                      />

                      <DateBlock
                        v-model="formData.fecha_ingreso"
                        label="Fecha de ingreso"
                        field_type="date"
                        required
                      />

                      <!-- TODO: Corregir el vue warning de las rules, quitando el string que se manda con un array al mandar o no un required
                                 además corregir que sea una fecha valida con formato, exceptueando que se menor al día de hoy. -->
                      <DateBlock
                        v-model="formData.fecha_egreso"
                        label="Fecha de egreso (Opcional)"
                        field_type="date"
                        help_text="En caso de que el empleado esté inactivo"
                      />

                     <!-- TODO: Todos los select mandarlos a componentes reutilizables de tipo SelectBlock
                             también separarlos como de tipo emit-value, map-options, normales, filtering, etc.-->
                      <q-select
                        v-model="formData.id_puesto"
                        dense
                        outlined
                        label="Puesto"
                        :options="positionsOptions"
                        type="text"
                        emit-value
                        map-options
                        :rules="[ val => val || 'Campo requerido']"
                      />

                     <!-- TODO: Todos los select mandarlos a componentes reutilizables de tipo SelectBlock
                             también separarlos como de tipo emit-value, map-options, normales, filtering, etc.-->
                      <q-select
                        v-model="formData.id_departamento"
                        dense
                        outlined
                        label="Departamento asignado"
                        :options="departmentsOptions"
                        type="text"
                        emit-value
                        map-options
                        :rules="[ val => val || 'Campo requerido']"
                      />

                      <div class="flex justify-end">
                        <q-btn no-caps type="submit" color="primary" label="Guardar"/>
                      </div>
                    </q-card-section>

                    {{ formData }}

                  </q-form>

              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeMount} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {event, useQuasar, } from 'quasar'
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

const {stopAndPrevent} = event
const submitResult = ref([])
const responseStatus = ref(false)
const responseMessage = ref('Error: ')

const is_loading = ref(true);

const maritalStatusOptions = ref([])
const departmentsOptions = ref([])
const positionsOptions = ref([])

const formData = ref({
  id_usuario: 0,
  CURP: '',
  RFC: '',
  NSS: '',
  infonavit: '',
  // factor_descuento: '',
  estado_civil: '',
  // SDI: '',
  // SD: '',
  // sueldo/salario: '',
  // periodo: '',
  nomina: '',
  salario: '',
  fecha_ingreso: '',
  fecha_egreso: '',
  id_puesto: '',
  id_departamento: ''
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

console.log(route.params.id)
console.log(typeof route.params.id);

onBeforeMount(() => {
  setTimeout(() => {
    api.get('/EstadoCivil/ListarTodo/').then(response => {
      console.log('response.data', response.data);
      response.data.value.forEach(function (obj: { label: any; nombre: any; value: any; id_estado_civil: any; }) {
        obj.label = obj.nombre
        delete obj.nombre
        obj.value = obj.id_estado_civil
        delete obj.id_estado_civil
      })
      maritalStatusOptions.value = response.data.value
      console.log('maritalStatusOptions', maritalStatusOptions.value)
    })

    api.get('/Departamento/ListarTodo/').then(response => {
      console.log('response.data', response.data);
      response.data.value.forEach(function (obj: { label: any; nombre: any; value: any; id_departamento: any; }) {
        obj.label = obj.nombre
        delete obj.nombre
        obj.value = obj.id_departamento
        delete obj.id_departamento
      })
      departmentsOptions.value = response.data.value
      console.log('departmentsOptions', departmentsOptions.value)
    })

    api.get('/Puesto/ListarTodo/').then(response => {
      console.log('response.data', response.data);
      response.data.value.forEach(function (obj: { label: any; nombre: any; value: any; id_puesto: any; }) {
        obj.label = obj.nombre
        delete obj.nombre
        obj.value = obj.id_puesto
        delete obj.id_puesto
      })
      positionsOptions.value = response.data.value
      console.log('positionsOptions', positionsOptions.value)
    })
  }, 1000)
})
const submitForm = () => {
  showLoadingBar('Estamos enviando la información. Espere un momento por favor...' )

  //formData.value.id_usuario = authStore.userData.id_usuario
  let params_id = route.params.id.toString();
  formData.value.id_usuario = parseInt(params_id)

  api.post('/PerfilEmpleado/CrearPerfilEmpleado/', formData.value, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
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
      ? 'Perfil actualizado exitosamente'
      : 'Ocurrió un error: ' + response.status, response.status === 200
      ? 'green' : 'red', [])

    setTimeout(() => {
      router.push(response.status === 201 || response.status === 200 ? '/user-management' : '/')
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
