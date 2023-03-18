<template>
<!-- TODO: Buscar por qué es necesario poner la altura mínima de 860px para que se centre
           tal vez necesito importar los demás css. -->
  <q-page class="row items-center justify-evenly" style="min-height: 860px;">
    <div class="col-12 col-md-5 col-lg-4 col-xl-4" v-bind:class="$q.screen.lt.sm ? 'q-pa-sm' : 'q-pa-xl'">
      <q-card class="my-card q-pa-lg" v-bind:style="$q.screen.lt.sm ? 'border: none;' : 'border: solid #ddd 1px;'">
        <q-card-section>
          <div class="row justify-center align-center">
            <div class="col-xs-12">
              <div class="text-center">
                <p style="font-size: 24px; margin: 0 0 2px 0;">Bienvenido, registra tu asistencia</p>
              </div>

              <div class="q-py-lg">
                <div class="col-sm-6 col-xs-12 text-center q-py-md gt-xs">
                  <q-icon name="fingerprint" size="xl" style="font-size: 100px; height: 150px; max-width: 150px"/>
                </div>
                <q-form class="q-gutter-md">

                  <EntryBlock
                    v-model="formData.nomina"
                    label="Número de nómina"
                    field_type="nomina"
                    help_text="Ingresa tu nómina asignada"
                    required
                  />

                </q-form>
              </div>

            </div>

          </div>
          <div class="row q-gutter-sm justify-between q-pt-lg">
            <!-- TODO: Aquí elegir bien cual sería la selección para marcar entrada o salida, radio button sería la opción más ideal,
                       puede hacerse dependiendo de la hora en que se toma la huella, sí es antes de la 1:00 pm se marca como entrada, y si es depués se marca como salida. -->
            <q-btn
              flat
              no-caps
              color="primary"
              class="fullwidth"
            >
              Salida
            </q-btn>

            <q-btn
              no-caps
              color="primary"
            >
              Entrada
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

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

let reloj = ref<string>('');

const date = new Date();

const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];

const [hour, minutes, seconds] = [
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
];

const formData = ref({
  nomina: '',
  huella: '',
})

onMounted(() => {
})

</script>
