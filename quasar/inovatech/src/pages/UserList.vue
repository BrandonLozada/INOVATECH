<template>
  <q-page class="row items-start justify-evenly" style="max-width: 100%; margin: 0 auto;">
    <div class="col-12" v-bind:class="$q.screen.lt.sm ? 'q-py-md' : 'q-pa-xl'">

      <div class="">
        <p style="font-size: 30px;">Listado de usuarios</p>
      </div>

      <div class="row justify-end q-my-md">
        <q-btn color="no-shadow"  class="bg-primary" unelevated no-caps :disable="is_loading" label="Agregar usuario" to="registrar-empresa" />
      </div>

      <q-table
        class="box-shadow-soft sticky-column-table"
        style="max-width: 100%; min-height: 50%;"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :loading="is_loading"
        no-data-label="Aún no se encuentra nada aquí"
        no-results-label="La búsqueda no arrojó ningún resultado"
      >

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn @click="router.push({'path':`/editar-empresa/${props.row.id}`})" class="no-caps q-mx-sm" color="teal" icon="edit" size="sm" flat dense/>
          </q-td>
        </template>
      </q-table>

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

const is_loading = ref(true);

const empresas = ref(null)

const users = ref(null)
const lstUsers = ref([]);

const rows = ref([])
const columns = ref()

onMounted(() => {
  setTimeout(() => {
    api.get('/Usuario/ListarUsuario/',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then(response => {
      lstUsers.value = response.data.value;
      console.log('response: ', response)
      console.log('lstUsers: ', lstUsers)
      console.log('lstUsers.value: ', lstUsers.value)

      is_loading.value = false

      columns.value = [
        {
          name: 'id_usuario',
          label: 'ID',
          field: 'id_usuario',
          align: 'left',
          sortable: true,
        },
        {
          name: 'nombre_completo',
          label: 'Nombre completo',
          field: 'nombre_completo',
          align: 'left',
          sortable: true,
        },
        {
          name: 'correo',
          label: 'Correo',
          field: 'correo',
          align: 'left',
          sortable: true,
        },
        {
          name: 'rol',
          label: 'Rol',
          field: 'rol',
          align: 'left',
          sortable: true,
        },
        {
          name: 'activo',
          label: 'Activo',
          field: 'activo',
          align: 'left',
          sortable: true,
        },
        {
          name: 'fecha_registro',
          label: 'Fecha de registro',
          field: 'fecha_registro',
          align: 'left',
          sortable: true,
        },
        {
          name: 'actions',
          label: 'Acciones',
          field: 'acciones',
          align: 'left',
          sortable: true,
        },
      ]

      // let fields = columns.value.map((item: { field: never; }) => {
      //   return item.field
      // })

      // lstUsers.value.forEach(obj => {
      //   for (let key in obj) {
      //     if (!fields.includes(key)) {
      //       delete obj[key]
      //     }
      //     // if (obj[key] === 'null') {
      //     //   obj[key] = ''
      //     // }
      //   }
      //   rows.value.push(obj)
      // })
    })
  }, 1000)
})
</script>

<style scoped lang="scss">
 .sticky-column-table {
   /* specifying max-width so the example can
    highlight the sticky column on any browser window */
    max-width: 600px;

    thead tr:last-child th:last-child {
      /* bg color is important for th; just specify one */
      background-color: #fff;
    }

     td:last-child {
       background-color: #cbeee6;
       text-align: center !important;
     }

     th:last-child,
     td:last-child {
       position: sticky;
       right: 0;
       z-index: 1;
       text-align: center !important;
     }
 }
</style>
