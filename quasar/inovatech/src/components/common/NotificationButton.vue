<template>
  <q-btn
    flat
    dense
    round
    icon="notifications"
    aria-label="Notificaciones"
  >
    <q-badge color="red" floating>2</q-badge>
  <q-tooltip :delay="3000">Mis notificaciones</q-tooltip>

    <q-menu anchor="top middle" self="bottom middle" class="z-top"
            transition-show="jump-down"
            transition-hide="jump-up"
            style="width: 350px; min-width: 350px; height: auto;">
      <q-card class="my-card">

      </q-card>
    </q-menu>
  </q-btn>


</template>

<script setup lang="ts">
import {useQuasar} from 'quasar'
import {useRouter} from 'vue-router'

const $q = useQuasar()
const router = useRouter()
</script>

<style scoped></style>
