<template>
  <q-page class="row items-start justify-evenly" style="max-width: 1000px; margin: 0 auto;">
    <div class="col-12 col-md-10 col-lg-10" v-bind:class="$q.screen.lt.sm ? 'q-pa-sm' : 'q-pa-xl'">
      <div class="q-pa-sm text-center">
        <div class="q-pt-sm">
          <div class="text-center">
            <p style="font-size: 30px; margin: 0 0 2px 0;">Perfil completo</p>
            <p class="text-grey-8" style="font-size: 0.875rem; font-weight: 400;">Consulta y revisa que la información del usuario y perfil de empleado estén actualizados.</p>
          </div>
        </div>
      </div>

      <q-card class="my-card col-12 q-mb-lg">
            <q-list separator>

        <q-item-label header class="text-black text-weight-regular"
                      style="font-weight: 500; font-size: 1rem; margin: 2px;">Información personal
        </q-item-label>

        <q-btn
          @click="router.push({'path':`/edit-user/${route.params.id}`})"
          label="Editar"
          flat
          color="grey-7"
          class="absolute-top-right bg-grey-2"
          style="top: 0; right: 15px; transform: translateY(15px);"
        ></q-btn>

        <q-item v-if="myUserData.nombre_completo != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Nombre completo
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myUserData.nombre_completo }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="myUserData.fecha_nacimiento != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Fecha de nacimiento
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myUserData.fecha_nacimiento }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="myUserData.sexo != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Sexo
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myUserData.sexo }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="myUserData.celular != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Celular
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myUserData.celular }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="myUserData.correo != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Correo
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myUserData.correo }}</q-item-label>
          </q-item-section>
        </q-item>
            </q-list>

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
        </div>

      </q-card>

      <!-- Tarjeta del perfil de empleado -->
      <q-card class="my-card col-12 q-mb-lg">
        <q-list v-show="!is_loading" separator>

          <q-item-label v-if="myEmployeeProfileData == null" header class="text-black text-weight-regular"
                        style="font-weight: 500; font-size: 1rem; margin: 2px;">Perfil empleado
          </q-item-label>

          <q-btn v-if="myEmployeeProfileData != null"
                 @click="router.push({'path':`/forms/profile-employee/${route.params.id}`})"
                 label="Editar"
                 flat
                 color="grey-7"
                 class="absolute-top-right bg-grey-2"
                 style="top: 0; right: 15px; transform: translateY(15px);"
          ></q-btn>

          <template v-if="myEmployeeProfileData != null">
                      <q-item-label header class="text-black text-weight-regular"
                        style="font-weight: 500; font-size: 1rem; margin: 2px;">Información de identificación
          </q-item-label>
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
          </template>

          <q-banner
            v-else
            class="bg-grey-2"
            rounded
          >
            <template v-slot:avatar>
              <q-icon name="info_outline" color="primary" />
            </template>
            <div class="text-subtitle1">
              No se encontró información relacionada con este perfil.
            </div>
            <template v-slot:action>
              <q-btn flat outline color="primary"
                     @click="router.push({'path':`/forms/profile-employee/${route.params.id}`})"
                     label="Agregar" />
            </template>
          </q-banner>
        </q-list>

        <q-inner-loading :showing="is_loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>

        <div v-show="is_loading" class="q-gutter-md q-px-md q-mt-md">
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
        </div>

        <div v-show="is_loading" class="q-gutter-md q-px-md q-mt-md">
          <q-skeleton class="q-mb-md" style="height: 90px;"/>
          <q-separator></q-separator>
          <q-skeleton class="q-mb-md" style="height: 30px;"/>
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

const myUserData = ref<any>([]);
const myEmployeeProfileData = ref<any>([]);

onBeforeMount(() => {
  setTimeout(() => {
    api.get(`/Usuario/ListarPerfil/${route.params.id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
        }
      }
      ).then(response => {
        //myUserData.value = response.data.value;
        // myUserData.value = response.data.value[0];
        console.log('response: ', response)
        console.log('response.data.length: ', response.data.value.length)

        if (response.data.value.length == 1) {
          myUserData.value = response.data.value[0];
        } else {
          myUserData.value = null;
        }

        console.log('myUserData: ', myUserData)
        console.log('myUserData.value: ', myUserData.value)
      }).then(() => {
        is_loading.value = false
      }).catch(() => {
        console.log('Error')
      })
  }, 1000)

  setTimeout(() => {
    api.get(`/PerfilEmpleado/ListarPerfilEmpleado/${route.params.id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
        }
      }
      ).then(response => {
        console.log('response: ', response);
        myEmployeeProfileData.value = response.data.value;
        console.log('myEmployeeProfileData: ', myEmployeeProfileData);

        if (response.data.value.length == 1) {
          myEmployeeProfileData.value = response.data.value[0];
        } else {
          myEmployeeProfileData.value = null;
        }
      }).then(() => {
        is_loading.value = false;
      }).catch((myEmployeeProfileData) => {
        console.log('Error');
        myEmployeeProfileData.value = null;
        console.log('catch', myEmployeeProfileData.value)
      })
  }, 1000)
})
</script>

