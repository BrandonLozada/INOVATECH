<template>
  <q-page class="row items-start justify-evenly" style="max-width: 1000px; margin: 0 auto;">
    <div class="col-12 col-md-10 col-lg-10" v-bind:class="$q.screen.lt.sm ? 'q-pa-sm' : 'q-pa-xl'">
      <div class="q-pa-sm text-center">
        <div class="q-pt-sm">
          <div class="text-center">
            <p style="font-size: 30px; margin: 0 0 2px 0;">Mi domicilio</p>
            <p class="text-grey-8" style="font-size: 0.875rem; font-weight: 400;">Consulta y comprueba que tus datos estén actualizados.</p>
          </div>
        </div>
      </div>

      <q-card class="my-card col-12">
        <q-item-label header class="text-black text-weight-regular"
                      style="font-weight: 500; font-size: 1rem; margin: 2px;">Domicilio
        </q-item-label>

        <q-btn
          to="crear-perfil"
          label="Editar"
          flat
          color="grey-7"
          class="absolute-top-right bg-grey-2"
          style="top: 0; right: 15px; transform: translateY(15px);"
        ></q-btn>

        <q-item v-if="myAddress.calle != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Calle
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myAddress.calle }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myAddress.numero_interior != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Número interior
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myAddress.numero_interior }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myAddress.numero_exterior != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Número exterior
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myAddress.numero_exterior }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myAddress.entre_calles_1 != null && myAddress.entre_calles_2 != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Entre calles
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10"> {{ myAddress.entre_calles_1 }} y {{ myAddress.entre_calles_2 }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myAddress.codigo_postal != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Código postal
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myAddress.codigo_postal }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myAddress.colonia != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Colonia
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myAddress.colonia }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myAddress.ciudad != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Ciudad
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myAddress.ciudad }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myAddress.estado != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              Estado
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myAddress.estado }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-ml-md"></q-separator>

        <q-item v-if="myAddress.pais != null">
          <q-item-section class="col-3">
            <q-item-label caption class="q-mt-sm" style="font-weight: 500;">
              País
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="q-mt-sm q-ml-lg text-grey-10">{{ myAddress.pais }}</q-item-label>
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

const myAddress = ref([]);

onBeforeMount(() => {
  setTimeout(() => {
    api.get(`/Domicilio/ListarDomicilio/${authStore.userData.id_usuario}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
        }
      }
      ).then(response => {
        myAddress.value = response.data.value[0];
        console.log('response: ', response)
        console.log('myAddress: ', myAddress)
        console.log('myAddress.value: ', myAddress.value)
      }).then(() => {
        is_loading.value = false
      }).catch(() => {
        console.log('Error')
      })
  }, 1000)
})
</script>

