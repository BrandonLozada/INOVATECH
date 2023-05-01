<template>
  <!-- TODO: Buscar por qué es necesario poner la altura mínima de 860px para que se centre
           tal vez necesito importar los demás css. -->
  <q-page class="row items-center justify-evenly" style="min-height: 860px;">
    <div class="col-12 col-md-5 col-lg-4 col-xl-4" v-bind:class="$q.screen.lt.sm ? 'q-pa-sm' : 'q-pa-xl'">
      <q-card class="my-card q-pa-lg" v-bind:style="$q.screen.lt.sm ? 'border: none;' : 'border: solid #ddd 1px;'">
        <q-card-section>
          <div class="row justify-center align-center">
            <div class="col-xs-12">
              <div class="row justify-center q-pa-sm q-pb-sm">
                <q-img
                  class="q-pb-md"
                  style="max-width: 150px; max-height: 80px;"
                  height="150"
                  width="200"
                  fit="contain"
                  src="/img/logos/inovatech_logo.png"
                  alt="Inovatech App."
                />
                </div>
              <div class="text-center">
                <p class="text-h4 text-weight-regular">Acceder</p>
                <p class="text-subtitle1 text-weight-light">Usa tu cuenta asignada de Inovatech</p>
              </div>

              <div class="q-py-lg">
                <q-form class="q-gutter-md">

                  <EntryBlock
                    v-model="authStore.userData.correo"
                    label="Correo electrónico"
                    field_type="email"
                    help_text="Dirección de correo de tu cuenta de Inovatech"
                    required
                  />

                  <EntryBlock
                    v-model="contrasenia"
                    label="Contraseña"
                    :type="showPassword ? 'text' : 'password'"
                    field_type="password"
                    help_text="Contraseña de tu cuenta"
                    required
                    @show-password="showPassword = !showPassword"
                  />

                </q-form>
              </div>

            </div>

          </div>

          <div class="column fit q-pb-lg">
            <q-btn
              v-if="showResetPasswordBtn"
              @click="resetPassword"
              no-caps color="red"
              class="fullwidth"
              :disabled="!emailPattern.test(authStore.userData.correo) ||
                         !passwordPattern.test(contrasenia)"
            >
              Recuperar contraseña
            </q-btn>
          </div>

          <div class="row q-gutter-sm justify-end">
            <q-btn
              @click="authStore.loginUserWithEmailAndPassword(authStore.userData.correo, contrasenia, $q, router)"
              no-caps
              color="primary"
              :disabled="!emailPattern.test(authStore.userData.correo) ||
                         !passwordPattern.test(contrasenia)"
            >
              Acceder
            </q-btn>
          </div>

        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useQuasar} from 'quasar'
import {useRouter, useRoute} from 'vue-router'
import EntryBlock from 'components/inputs/EntryBlock.vue';
import {useUserStore} from 'stores/user';

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const authStore = useUserStore()
const emailPattern = /^(?=[a-zA-Z0-9@.%+-]{6,254}$)[a-zA-Z0-9.%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})/;
const showResetPasswordBtn = ref<boolean>(false)
const showPassword = ref<boolean>(false);

const contrasenia = ref( '')

// const formData = ref({
//   correo: '',
//   contrasenia: '',
// })

// TODO: Hacer función para restablecer la contraseña
const resetPassword = (val: string) => {
  if (!!val) {
    return emailPattern.test(val) || 'La dirección email no tiene formato correcto';
  } else {
    return 'Escribe tu email asociado a tu cuenta';
  }
}

const signIn = async () => {
  $q.loading.show({
    message: 'Estamos generando tu cuenta, por favor espera...'
  })
  try {
    //await signInWithEmailAndPassword(firebaseAuth, email.value, password.value)
    await router.push('/')
  } catch (error) {
    console.log(error.message)
    $q.dialog({
      title: 'Error',
      message: 'Error en la autenticación, verifica que tu email y contraseña sean correctos',
      ok: 'Entendido'
    }).onOk(() => {
      showResetPasswordBtn.value = true
    })
  } finally {
    $q.loading.hide()
  }
}
</script>
