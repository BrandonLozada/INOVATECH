<template>
  <q-page class="row items-start justify-evenly" style="max-width: 100%; margin: 0 auto;">
    <div class="col-12" v-bind:class="$q.screen.lt.sm ? 'q-py-md' : 'q-pa-xl'">

      <div class="">
        <p style="font-size: 30px;">Gestión de usuarios</p>
      </div>

      <div class="row justify-end q-my-md">
        <q-btn color="no-shadow"  class="bg-primary" unelevated no-caps :disable="is_loading" label="Agregar usuario" to="forms/user" />
      </div>

      <q-table
        title="Listado de usuarios"
        class="box-shadow-soft sticky-column-table"
        style="max-width: 100%; min-height: 50%;"
        :rows="rows"
        :columns="columns"
        row-key="id_usuario"
        :loading="is_loading"
        no-data-label="Aún no se encuentra nada aquí"
        no-results-label="La búsqueda no arrojó ningún resultado"
      >

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width></q-th>

            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">

          <q-tr :props="props">
            <q-td auto-width>

              <div class="q-gutter-x-sm">

<!--              <q-toggle v-model="props.expand" checked-icon="add" unchecked-icon="remove"></q-toggle>-->

                <q-btn @click="router.push({'path':`/user-profile/${props.row.id_usuario}`})" class="no-caps" color="secondary" icon="pageview" size="16px" flat round dense/>

                <q-btn @click="router.push({'path':`edit-user/${props.row.id_usuario}`})" class="no-caps" color="secondary" icon="edit" size="16px" flat round dense/>

                <q-btn @click="deleteUser(props.row.id_usuario)" color="secondary" icon="delete" size="16px" flat round dense></q-btn>

                <!--              <q-btn @click="router.push({'path':`/user-profile/${props.row.id_usuario}`})" class="no-caps" color="secondary" icon="rate_review" size="16px" flat round dense/>-->

              </div>
            </q-td>

<!--            <q-td auto-width>-->
<!--              <q-btn @click="router.push({'path':`/user-profile/${props.row.id_usuario}`})" class="no-caps" color="secondary" icon="rate_review" size="md" flat dense/>-->
<!--           </q-td>-->

<!--            <q-td auto-width>-->
<!--              <q-btn @click="router.push({'path':`/user-profile/${props.row.id_usuario}`})" class="no-caps" color="secondary" icon="delete" size="md" flat dense/>-->
<!--           </q-td>-->

            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>

<!--            <q-td auto-width>-->
<!--              <q-btn @click="router.push({'path':`/user-profile/${props.row.id_usuario}`})" class="no-caps" color="secondary" icon="edit" size="md" flat dense/>-->
<!--           </q-td>-->
          </q-tr>

<!--          <q-tr v-show="props.expand" :props="props">-->
<!--            <q-td colspan="100%">-->

<!--              <div class="q-pl-lg">-->
<!--&lt;!&ndash;                <div class="text-left">Motivo: {{ props.row.motivo }}.</div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div v-if="props.row.observaciones != null" class="text-left">Observaciones: {{ props.row.observaciones }}.</div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="text-left">Jefe autorizador: {{ props.row.nombre_usuario_autorizador }}.</div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="text-left">Fecha de solicitud: {{ props.row.fecha_solicitud }}</div>&ndash;&gt;-->
<!--              </div>-->

<!--            </q-td>-->
<!--          </q-tr>-->


        </template>
      </q-table>

    </div>
  </q-page>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useQuasar} from 'quasar'
import {api} from 'boot/axios'
import {useAuthStore} from 'stores/auth';

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const is_loading = ref(true);

const lstUsers = ref([]);
const rows = ref([])
const columns = ref()

const showNotification = (
  message: string,
  color: string,
  actions: {
    label: string;
    color: string;
    handler: () => void
  }[] | undefined) => {
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

const deleteUser = (id_usuario: number) => {
  // showLoadingBar('Estamos enviando la información. Espere un momento por favor...' )

  api.delete(`/Usuario/EliminarUsuarioFisico/${id_usuario}/`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
      }
    }
  ).then(response => {
    console.log('response', response)
    // $q.loading.hide()

    showNotification(response.status === 200
      ? response.data.value
      : 'Ocurrió un error: ' + response.status, response.status === 200
      ? 'green' : 'red', [])

    getUsers();

  }).catch(error => {
    console.log(error);
    showNotification('Ocurrió un error' + error, 'red', [ { label: 'Aceptar', color: 'white', handler: () => { /* ... */} } ])
    // $q.loading.hide()
  })
}

const getUsers = () => {
  api.get('/Usuario/ListarUsuario/',
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
      }
    }
  ).then(response => {
    lstUsers.value = response.data.value;
    console.log('lstUsers.value: ', lstUsers.value)
    console.log('rows', rows.value)

    is_loading.value = false

    columns.value = [
      {
        name: 'name',
        required: true,
        label: 'ID',
        align: 'left',
        field: (row: { id_usuario: never; }) => row.id_usuario,
        format: (val: never) => `${val}`,
        sortable: true
      },
      {name: 'nombre_completo', align: 'left', label: 'Nombre completo', field: 'nombre_completo', sortable: true},
      {name: 'correo', align: 'left', label: 'Correo', field: 'correo', sortable: true},
      {name: 'rol', align: 'left', label: 'Rol', field: 'rol', sortable: true},
      {name: 'activo', align: 'left', label: 'Activo', field: 'activo'},
      {name: 'fecha_registro', align: 'left', label: 'Fecha registro ', field: 'fecha_registro', sortable: true},
      // { name: 'fecha_registro', align: 'left', label: 'Fecha registro ', field: 'fecha_registro', sortable: true },
    ]

    rows.value = lstUsers.value
    console.log('rows transformado', rows.value)
  })
}

onMounted(() => {
  setTimeout(() => {
    getUsers()

  }, 1000)
})
</script>

<style scoped lang="scss">
 .sticky-column-table {
   /* specifying max-width so the example can
    highlight the sticky column on any browser window */
    max-width: 600px;

    thead tr:first-child th:first-child {
      /* bg color is important for th; just specify one */
      background-color: #fff;
    }

     td:first-child {
       background-color: #f8f9fa;
       text-align: center !important;
     }

     th:first-child,
     td:first-child {
       position: sticky;
       left: 0;
       z-index: 1;
       text-align: center !important;
     }
 }
</style>
