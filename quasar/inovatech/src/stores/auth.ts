import {defineStore} from 'pinia'
import {api} from 'boot/axios'
import {useQuasar} from 'quasar'
import {ref} from 'vue';
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

export const useAuthStore = defineStore('auth', {
    state: () => ({
      continueToURL: '/',
      userData: {id_usuario: '', nombre: '', primer_apellido: '', segundo_apellido: '', fecha_nacimiento: '', sexo: '', correo: '', celular: '',	es_activo: false,	id_rol: ''},
      inovatechUserData: {accessToken: ''},
      loadingUser: false,
      loading: false,
      showResetPasswordBtn: false,
    }),

    getters: {
      signInURL: (state) => state.continueToURL === '/' ? '/sign-in' : '/sign-in' + '?continue=' + state.continueToURL,
    },

    actions: {
      loginUserWithEmailAndPassword: async function (correo: string, contrasenia: string, $q: any, router: any) {
        $q.loading.show({
          message: 'Iniciando sesión, por favor espera...'
        })
        const formData = ref({correo: correo, contrasenia: contrasenia})
        try {
          api.post('/Autenticacion/Validar/', formData.value, {
            headers: {
              'Content-Type': 'application/json',
            }
          }
          ).then(response => {
            this.inovatechUserData.accessToken = response.data.accessToken;
            let user = {};
            user = response.data.value[0];
            console.log('response: ', response)
            console.log('response.data.value[0]: ', response.data.value[0])
            console.log('user: ', user)

            this.userData = Object.assign(user);
            console.log(this.userData)
            console.log(this.inovatechUserData)

            const title = '¡Bienvenido, ' + this.userData.nombre + ' ' + this.userData.primer_apellido + '!'
            const message = 'Tu sesión está activa ahora.<br>'

            $q.dialog({
            title: title,
            message: message,
            ok: {label: 'Aceptar', 'no-caps': true},
            html: true,
            persistent: true,
            }).onOk(() => {
              if (this.continueToURL === '/') {
                router.push(this.continueToURL)
              } else {
                window.location.href = this.continueToURL;
              }
            })


          })
        } catch (error: any) {
          !error.message ? error = {message: 'Ocurrió un error al crear tu cuenta'} : true
          $q.dialog({
            title: 'Error',
            message: 'Error en la autenticación, verifica que tu email y contraseña sean correctos',
            ok: {label: 'Aceptar', 'no-caps': true},
            persistent: true,
          }).onOk(() => {
            this.showResetPasswordBtn = true
          })
        } finally {
          $q.loading.hide()
        }
      },

      logoutUser: async function ($q: any, router: any) {
        $q.loading.show({message: 'Cerrando sesión, por favor espera...'})
        try {
          // await firebaseAuth.signOut()
          this.userData = {
            fecha_nacimiento: '',
            nombre: '',
            primer_apellido: '',
            segundo_apellido: '',
            sexo: '',
            id_usuario: '',
            correo: '',
            celular: '',
            es_activo: false,
            id_rol: ''
          }
          this.inovatechUserData = {accessToken: ''}
          router.push('sign-in')
        } catch (error: any) {
          console.log(error)
        } finally {
          $q.loading.hide()
        }
      },


    },

})

// export {useAuthStore};
