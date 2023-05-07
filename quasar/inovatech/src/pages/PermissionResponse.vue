<template>
  <q-page class="row items-start justify-evenly" style="max-width: 1000px; margin: 0 auto;">
    <div class="col-12 col-md-10 col-lg-10" v-bind:class="$q.screen.lt.sm ? 'q-pa-sm' : 'q-pa-xl'">
      <div class="q-pa-sm text-center">
        <div class="q-pt-sm">
          <div class="text-center">
            <p style="font-size: 30px; margin: 0 0 2px 0;">Respuesta a solicitud</p>
            <p class="text-grey-8" style="font-size: 0.875rem; font-weight: 400;">Revisa la información y da una respuesta a la solicitud.</p>
          </div>
        </div>
      </div>

      <q-card class="my-card col-12">
        <q-item-label header class="text-black text-weight-regular"
                      style="font-weight: 500; font-size: 1rem; margin: 2px;">Solicitud de permiso
        </q-item-label>

        <q-item v-if="permissionRequest.nombre_usuario_solicitante != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Nombre del empleado
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ permissionRequest.nombre_usuario_solicitante }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="permissionRequest.tipo_permiso != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Tipo de permiso
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ permissionRequest.tipo_permiso }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="permissionRequest.estado != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Estado
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ permissionRequest.estado }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="permissionRequest.dias != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Días
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ permissionRequest.dias }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="permissionRequest.fecha_inicio != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Fecha de inicio
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ permissionRequest.fecha_inicio }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="permissionRequest.fecha_fin != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Fecha de fin
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ permissionRequest.fecha_fin }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="permissionRequest.motivo != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Motivo
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ permissionRequest.motivo }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="permissionRequest.fecha_solicitud != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Fecha de solicitud
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ permissionRequest.fecha_solicitud }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-inner-loading :showing="is_loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>

        <div v-show="is_loading" class="q-gutter-md q-px-md q-mt-md">
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
        </div>
      </q-card>

      <!-- TODO: Aquí poner un formulario de;
                 P_idSolicitud_permiso = P_idSolicitud,
                 P_Estado = P_estado,
                 P_Observaciones = P_observaciones,
                 P_idUsuario_autorizador = P_id_usuario_autorizador -->
      <RequestPermissionForm props="formData.value"/>

    </div>

  </q-page>
</template>

<script setup lang="ts">
import {ref, onBeforeMount} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useQuasar} from 'quasar'
import {api} from 'boot/axios'
import {useAuthStore} from 'stores/auth';
import {useContextStore} from 'stores/SiteContextStore'
import RequestPermissionForm from 'components/forms/RequestPermissionForm.vue';

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const siteContext = useContextStore()
siteContext.currentPage = route.path

const is_loading = ref(true);

const permissionRequest = ref([]);

const formData = ref({
  id_usuario_solicitante: 2,
  id_permiso: 3,
  motivo: 'HOLA',
  fecha_inicio: '2023/05/07',
  fecha_fin: '2023/05/12',
  id_usuario_autorizador: 2
})

onBeforeMount(() => {
  setTimeout(() => {
    api.get(`/Permiso/ConsultarPermiso/${route.params.id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
        }
      }
      ).then(response => {
        permissionRequest.value = response.data.value[0];
        console.log('response: ', response)
        console.log('permissionRequest: ', permissionRequest)
        console.log('permissionRequest.value: ', permissionRequest.value)
      }).then(() => {
        is_loading.value = false
      }).catch(() => {
        console.log('Error')
      })
  }, 1000)
})
</script>

