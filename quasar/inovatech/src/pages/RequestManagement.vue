<template>
  <q-page class="row items-start justify-evenly" style="max-width: 100%; margin: 0 auto;">
    <div class="col-12" v-bind:class="$q.screen.lt.sm ? 'q-py-md' : 'q-pa-xl'">

      <div class="">
        <p style="font-size: 30px;">Solicitudes</p>
      </div>

      <div class="row justify-end q-my-md">
        <q-btn color="no-shadow"  class="bg-primary" unelevated no-caps :disable="is_loading" label="Crear solicitud" to="forms/request-permission" />
      </div>

      <q-table
        title="Listado de solicitudes de permisos"
        class="box-shadow-soft sticky-column-table"
        style="max-width: 100%; min-height: 50%;"
        :rows="rows"
        :columns="columns"
        row-key="id_solicitud_permiso"
        :loading="is_loading"
        no-data-label="Aún no se encuentra nada aquí"
        no-results-label="La búsqueda no arrojó ningún resultado"
      >
<!--        <template v-slot:body-cell-actions="props">-->
<!--          <q-tr :props="props">-->
<!--            <q-btn @click="router.push({'path':`/editar-empresa/${props.row.id_solicitud_permiso}`})" class="no-caps q-mx-sm" color="teal" icon="edit" size="sm" flat dense/>-->
<!--          </q-tr>-->
<!--        </template>-->

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

        <template v-slot:body="props"> <!--@click="onRowClick(props.row)"-->
          <q-tr :props="props" >
            <q-td auto-width>
              <q-toggle v-model="props.expand" checked-icon="add" unchecked-icon="remove"></q-toggle>
            </q-td>

            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>

           <q-td auto-width>
              <q-btn @click="router.push({'path':`/permission-response/${props.row.id_solicitud_permiso}`})" class="no-caps" color="secondary" icon="rate_review" size="md" flat dense/>
           </q-td>

          </q-tr>

          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">

              <div class="q-pl-lg">
                <div class="text-left">Motivo: {{ props.row.motivo }}.</div>
                <div v-if="props.row.observaciones != null" class="text-left">Observaciones: {{ props.row.observaciones }}.</div>
                <div class="text-left">Jefe autorizador: {{ props.row.nombre_usuario_autorizador }}.</div>
                <div class="text-left">Fecha de solicitud: {{ props.row.fecha_solicitud }}</div>
<!--                <q-btn @click="router.push({'path':`/editar-empresa/${props.row.id_solicitud_permiso}`})" class="no-caps q-mx-sm" color="teal" icon="edit" size="sm" flat dense/>-->
              </div>

            </q-td>
          </q-tr>

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

const lstRequets = ref([]);
const rows = ref([])
const columns = ref()

// const onRowClick = (row: { id_solicitud_permiso: never; }) => alert(`${row.id_solicitud_permiso} clicked`)

onMounted(() => {
  setTimeout(() => {
    api.get('/Permiso/ListarPermiso/',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authStore.inovatechUserData.accessToken,
        }
      }
    ).then(response => {
      lstRequets.value = response.data.value;
      console.log('lstRequets.value: ', lstRequets.value)
      console.log('rows', rows.value)

      is_loading.value = false

      columns.value = [
        {
          name: 'name',
          required: true,
          label: 'ID solicitud',
          align: 'left',
          field: (row: { id_solicitud_permiso: never; }) => row.id_solicitud_permiso,
          format: (val: never) => `${val}`,
          sortable: true
        },
        { name: 'nombre_usuario_solicitante', align: 'left', label: 'Empleado solicitante', field: 'nombre_usuario_solicitante', sortable: true },
        { name: 'tipo_permiso', align: 'left', label: 'Tipo de permiso', field: 'tipo_permiso', sortable: true },
        { name: 'estado', align: 'left', label: 'Estado', field: 'estado', sortable: true },
        { name: 'dias', align: 'left', label: 'Días', field: 'dias' },
        { name: 'fecha_inicio', align: 'left', label: 'Fecha inicio ', field: 'fecha_inicio', sortable: true },
        { name: 'fecha_fin', align: 'left', label: 'Fecha fin', field: 'fecha_fin' },
        // { name: 'actions', align: 'center', label: 'actions', field: 'actions' }
      ]

      rows.value = lstRequets.value
      console.log('rows transformado', rows.value)

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
       background-color: #eef2f7;
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
