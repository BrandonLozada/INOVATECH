<template>
  <q-btn
    flat
    dense
    round
    icon="person"
    aria-label="Cuenta"
  >
  <q-tooltip :delay="3000">Mi cuenta</q-tooltip>

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
import { ref} from 'vue'
import {useQuasar} from 'quasar'
import {useRouter} from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const showPassword = ref(false);
</script>

<style scoped></style>
