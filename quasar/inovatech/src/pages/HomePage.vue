<template>
  <q-page class="row items-center justify-evenly" style="max-width: 1600px; margin: 0 auto;">
    <div class="col-md-10 col-lg-8" v-bind:class="$q.screen.lt.sm ? 'q-pa-md' : 'q-pa-xl'">
          <div class="q-pa-sm text-center">
            <div class="q-pt-sm items-center">
              <q-avatar round size="100px" font-size="50px" color="grey" text-color="white" icon="account_circle"/>

              <div class="text-subtitle1 q-mt-md text-center">
                <p style="font-weight: 500; margin: 0 ">Bienvenido </p>
                <!-- TODO: Sacar datos provenientes del estado de Pinia -->
                <p style="font-weight: 300;">Brandon Lozada Cárdenas</p>
              </div>
            </div>
          </div>
      <div class="text-center">
        <p class="text-grey-8" style="font-size: 0.875rem; font-weight: 400;">Gestiona tu información y explora las herramientas a fin de que tengas la experiencia completa en la plataforma de Inovatech.</p>
      </div>

        <!-- TODO: Convertirlo a componentes reutilizables como tarjeta y su botón de redirecciónamiento. -->
        <div class="row q-col-gutter-lg q-pb-lg">
          <div class="col-12 col-md-6">
            <q-card class="my-card full-height q-pb-xl">
                <q-card-section horizontal>
                  <q-card-section>
                  <div class="text-left">
                    <p style="font-weight: 500; font-size: 1rem; margin: 0 0 2px 0;">Integridad y veracidad de tus datos</p>
                    <div>
                      <p class="text-left text-grey-8 q-pt-sm" style="font-size: 0.875rem; font-weight: 400; margin: 0 0 2px 0;">
                    Consulta la información tanto de tus datos personales, información laboral y domicilio.
                      </p>
                    </div>
                  </div>
                  </q-card-section>
                </q-card-section>
                <q-btn no-caps flat align="left" size="17px" class="absolute-bottom text-grey-7 text-weight-light" style="border-top: solid #ddd 1px;" to="my-profile">Mi perfil</q-btn>
          </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="my-card full-height q-pb-xl">
                <q-card-section horizontal>
                  <q-card-section>
                  <div class="text-left">
                    <p style="font-weight: 500; font-size: 1rem; margin: 0 0 2px 0;">Solicitudes de permisos</p>
                    <div>
                      <p class="text-left text-grey-8 q-pt-sm" style="font-size: 0.875rem; font-weight: 400; margin: 0 0 2px 0;">
                        Administra tu tiempo acorde a tus necesidades laborales, paternalesm modalidad de trabajo y flexibilidad de horarios solicitando permisos a tu encargado de departamento a la que colaboras.
                      </p>
                    </div>
                  </div>
                  </q-card-section>
                </q-card-section>
                <q-btn no-caps flat align="left" size="17px" class="absolute-bottom text-grey-7 text-weight-light" style="border-top: solid #ddd 1px;" to="forms/request-permission">Solicitar un permiso</q-btn>
          </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="my-card full-height q-pb-xl">
                <q-card-section horizontal>
                  <q-card-section>
                  <div class="text-left">
                    <p style="font-weight: 500; font-size: 1rem; margin: 0 0 2px 0;">Módulo de control de asistencia</p>
                    <div>
                      <p class="text-left text-grey-8 q-pt-sm" style="font-size: 0.875rem; font-weight: 400; margin: 0 0 2px 0;">
                        Supervisa como Líder responsable de los controles de asistencia y alcance el óptimo desempeño de tu equipo de trabajo que existen en la plataforma Inovatech.
                      </p>
                    </div>
                  </div>
                  </q-card-section>
                </q-card-section>
                <q-btn no-caps flat align="left" size="17px" class="absolute-bottom text-grey-7 text-weight-light" style="border-top: solid #ddd 1px;" to="attendance-control">Entrar a módulo</q-btn>
          </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="my-card full-height q-pb-xl">
                <q-card-section horizontal>
                  <q-card-section>
                  <div class="text-left">
                    <p style="font-weight: 500; font-size: 1rem; margin: 0 0 2px 0;">Módulo de asistencia</p>
                    <div>
                      <p class="text-left text-grey-8 q-pt-sm" style="font-size: 0.875rem; font-weight: 400; margin: 0 0 2px 0;">
                        Ingresa tu asistencia a tu área de trabajo mediante el módulo de asistencia por lector de huella dactilar disponible dentro de la recepción de las oficinas de Inovatech.
                        Mide tus tiempos con aticipación para evitar retrasos y penalizaciones correspondientes a estos eventos inoportunos.
                      </p>
                    </div>
                  </div>
                  </q-card-section>
                </q-card-section>
                <q-btn no-caps flat align="left" size="17px" class="absolute-bottom text-grey-7 text-weight-light" style="border-top: solid #ddd 1px;" to="fingerprint-attendance">Entrar a módulo</q-btn>
          </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="my-card full-height q-pb-xl">
                <q-card-section horizontal>
                  <q-card-section>
                  <div class="text-left">
                    <p style="font-weight: 500; font-size: 1rem; margin: 0 0 2px 0;">Inconsistencias en mi información</p>
                    <div>
                      <p class="text-left text-grey-8 q-pt-sm" style="font-size: 0.875rem; font-weight: 400; margin: 0 0 2px 0;">
                        Solicita la corrección de tus información de tu perfil de Inovatech en caso de existir inconsistencias en la información que se almacenó.
                      </p>
                    </div>
                  </div>
                  </q-card-section>
                </q-card-section>
              <q-btn no-caps flat align="left" size="17px" class="absolute-bottom text-grey-7 text-weight-light" style="border-top: solid #ddd 1px;" to="request-permission">Entrar</q-btn>
          </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="my-card full-height q-pb-xl">
                <q-card-section horizontal>
                  <q-card-section>
                  <div class="text-left">
                    <p style="font-weight: 500; font-size: 1rem; margin: 0 0 2px 0;">Gestión de usuarios</p>
                    <div>
                      <p class="text-left text-grey-8 q-pt-sm" style="font-size: 0.875rem; font-weight: 400; margin: 0 0 2px 0;">
                        Con tus privilegios de tu cuenta asociada dentro de la plataforma Inovatech puedes agregar, modificar y eliminar la información de los usuarios y sus correspondientes perfiles de empleado e información del domicilio.
                      </p>
                    </div>
                  </div>
                  </q-card-section>
                </q-card-section>
              <q-btn no-caps flat align="left" size="17px" class="absolute-bottom text-grey-7 text-weight-light" style="border-top: solid #ddd 1px;" to="user-management">Entrar a módulo</q-btn>
          </q-card>
          </div>
        </div>

      <div class="row q-gutter-y-lg justify-center align-center">
          <q-card class="my-card col-12">
            <q-card-section horizontal class="justify-between">
              <q-card-section class="col-12">
                <div class="text-left">
                  <p style="font-weight: 500; font-size: 1rem; margin: 0 0 2px 0;">Módulo de asistencia</p>
                </div>
                <p class="text-left text-grey-8 q-pt-sm" style="font-size: 0.875rem; font-weight: 400; margin: 0 0 2px 0;">
                  Ingresa tu asistencia a tu área de trabajo mediante el módulo de asistencia por lector de huella dactilar disponible dentro de la recepción de las oficinas de Inovatech.
                  Mide tus tiempos con aticipación para evitar retrasos y penalizaciones correspondientes a estos eventos inoportunos.
                </p>
              </q-card-section>
              </q-card-section>
          <q-separator></q-separator>
            <q-item>
              <q-btn no-caps flat align="left" size="19px" class="absolute-bottom text-grey-7 text-weight-light" style="border-top: solid #ddd 1px;" to="fingerprint-attendance">Entrar a módulo</q-btn>
            </q-item>
          </q-card>
        </div>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {api} from 'boot/axios'
// import {get_users} from 'boot/utils'

// import {useAuthStore} from 'stores/auth'
// import {useContextStore} from 'stores/SiteContextStore'

// const authStore = useAuthStore()
// const siteContext = useContextStore()
const router = useRouter()
const route = useRoute()
// siteContext.current_page = route.path
</script>

<style scoped lang="scss">

</style>
