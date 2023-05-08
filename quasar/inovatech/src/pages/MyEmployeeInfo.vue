<template>
  <q-page class="row items-start justify-evenly" style="max-width: 1000px; margin: 0 auto;">
    <div class="col-12 col-md-10 col-lg-10" v-bind:class="$q.screen.lt.sm ? 'q-pa-sm' : 'q-pa-xl'">
      <div class="q-pa-sm text-center">
        <div class="q-pt-sm">
          <div class="text-center">
            <p style="font-size: 30px; margin: 0 0 2px 0;">Mi perfil de empleado</p>
            <p class="text-grey-8" style="font-size: 0.875rem; font-weight: 400;">Consulta y comprueba que tus datos estén actualizados.</p>
          </div>
        </div>
      </div>

      <q-card class="my-card col-12">
        <q-item-label header class="text-black text-weight-regular"
                      style="font-weight: 500; font-size: 1rem; margin: 2px;">Información de identificación
        </q-item-label>

        <q-btn
          to="forms/profile-employee"
          label="Editar"
          flat
          color="grey-7"
          class="absolute-top-right bg-grey-2"
          style="top: 0; right: 15px; transform: translateY(15px);"
        ></q-btn>

        <div v-show="is_loading" class="q-gutter-md q-px-md q-mt-md">
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
        </div>

        <q-item v-if="myEmployeeProfileData.curp != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              CURP
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myEmployeeProfileData.curp }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myEmployeeProfileData.rfc != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              RFC
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myEmployeeProfileData.rfc }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myEmployeeProfileData.nss != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              NSS
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myEmployeeProfileData.nss }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myEmployeeProfileData.infonavit != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Infonavit
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myEmployeeProfileData.infonavit }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myEmployeeProfileData.estado_civil != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Estado civil
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myEmployeeProfileData.estado_civil }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item-label header class="text-black text-weight-regular"
                      style="font-weight: 500; font-size: 1rem; margin: 2px;">Información laboral
        </q-item-label>

        <q-item v-if="myEmployeeProfileData.nomina != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Nómina
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myEmployeeProfileData.nomina }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myEmployeeProfileData.salario != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Salario/Sueldo mensual
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> ${{ myEmployeeProfileData.salario }} pesos</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myEmployeeProfileData.fecha_ingreso != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Fecha ingreso
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myEmployeeProfileData.fecha_ingreso }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myEmployeeProfileData.dias_descanso != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Días otorgados
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myEmployeeProfileData.dias_descanso }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myEmployeeProfileData.puesto != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Puesto
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myEmployeeProfileData.puesto }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myEmployeeProfileData.departamento != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Departamento
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myEmployeeProfileData.departamento }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-inner-loading :showing="is_loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>

        <div v-show="is_loading" class="q-gutter-md q-px-md q-mt-md">
          <q-skeleton class="q-mb-md" style="height: 90px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
        </div>
      </q-card>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import {ref, onBeforeMount} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useQuasar} from 'quasar'
import {api} from 'boot/axios'
import {useAuthStore} from 'stores/auth';

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const is_loading = ref(true);

const myEmployeeProfileData = ref([]);

onBeforeMount(() => {
  setTimeout(() => {
    api.get(`/PerfilEmpleado/ListarPerfilEmpleado/${authStore.userData.id_usuario}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
        }
      }
      ).then(response => {
        myEmployeeProfileData.value = response.data.value[0];
        console.log('myEmployeeProfileData: ', myEmployeeProfileData)
      }).then(() => {
        is_loading.value = false
      }).catch(() => {
        console.log('Error')
      })
  }, 1000)
})
</script>

