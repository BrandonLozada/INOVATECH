import {defineStore} from 'pinia'
import {api} from 'boot/axios'
import {useQuasar} from 'quasar'
import {ref} from "vue";

const $q = useQuasar()

const useUserStore = () => {


  return defineStore('auth', {

    // TODO: Decidir si el idioma de toda variable, función, otras por haber será en inglés o español.
    state: () => ({
      continueToURL: '/',
      // myUserData = ref([]),
      userData: {id_usuario: '', nombre: '', primer_apellido: '', segundo_apellido: '', fecha_nacimiento: '', sexo: '', correo: '', celular: '',	es_activo: false,	id_rol: ''},
      // accountData: {nombre: '', primer_apellido: '', segundo_apellido: '', fecha_nacimiento: '', sexo: ''},
      loadingUser: false,
      loading: false,
      showResetPasswordBtn: false,
    }),

    getters: {
      signUpURL: (state) => state.continueToURL === '/' ? '/signup' : '/signup' + '?continue=' + state.continueToURL,
      signInURL: (state) => state.continueToURL === '/' ? '/signin' : '/signin' + '?continue=' + state.continueToURL,
    },

    actions: {
      loginUserWithEmailAndPassword: async function (correo: string, contrasenia: string, $q: any, router: any) {
        $q.loading.show({
          message: 'Iniciando sesión, por favor espera...'
        })
        const formData = ref({correo: correo, contrasenia: contrasenia})
        try {

          api.post('/Usuario/IdentificarUsuario/', formData.value, {
            headers: {
              // 'Content-Type': 'application/json',
              // 'Authorization': 'JWT ',
            }
          }).then(response => {
            // const user = ref({});
            let user = {}
            user = response.data.value[0];
            // user.value = response.data.value[0];
            // console.log('response: ', response)
            console.log('response.data.value[0]: ', response.data.value[0])
            console.log('user: ', user)

            this.userData = Object.assign(user);

            console.log(this.userData)

            // this.userData = {
            //   fecha_nacimiento: "",
            //   nombre: "",
            //   primer_apellido: "",
            //   segundo_apellido: "",
            //   sexo: "",
            //   id_usuario: user.value., correo: user.correo, celular: user.celular,	es_activo: user.es_activo,	id_rol: user.id_rol}

            if (this.continueToURL === '/') {
              router.push(this.continueToURL)
            } else {
              window.location.href = this.continueToURL;
            }
            this.showResetPasswordBtn = false
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


    },

})()
}

export {useUserStore};
