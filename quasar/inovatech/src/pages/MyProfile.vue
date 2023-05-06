<template>
  <q-page class="row items-start justify-evenly" style="max-width: 1000px; margin: 0 auto;">
    <div class="col-12 col-md-10 col-lg-10" v-bind:class="$q.screen.lt.sm ? 'q-pa-sm' : 'q-pa-xl'">
      <div class="q-pa-sm text-center">
        <div class="q-pt-sm">
          <div class="text-center">
            <p style="font-size: 30px; margin: 0 0 2px 0;">Mi perfil</p>
            <p class="text-grey-8" style="font-size: 0.875rem; font-weight: 400;">Consulta y comprueba que tus datos estén actualizados.</p>
          </div>
        </div>
      </div>

      <q-card class="my-card col-12">
        <q-item-label header class="text-black text-weight-regular"
                      style="font-weight: 500; font-size: 1rem; margin: 2px;">Datos personales
        </q-item-label>

        <q-btn
          to="crear-perfil"
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

        <q-separator class="q-ml-md"></q-separator>

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

        <q-separator class="q-ml-md"></q-separator>

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

        <q-separator class="q-ml-md"></q-separator>

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

        <q-separator class="q-ml-md"></q-separator>

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

const myUserData = ref([]);

onBeforeMount(() => {
  setTimeout(() => {
    api.get(`/Usuario/ListarPerfil/${authStore.userData.id_usuario}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
        }
      }
      ).then(response => {
        myUserData.value = response.data.value[0];
        console.log('response: ', response)
        console.log('myUserData: ', myUserData)
        console.log('myUserData.value: ', myUserData.value)
      }).then(() => {
        is_loading.value = false
      }).catch(() => {
        console.log('Error')
      })
  }, 1000)
})
</script>

