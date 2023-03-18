<template>
  <q-header elevated class="q-px-sm"
            v-bind:style="$q.screen.lt.md ? 'min-height: 65px;' : 'min-height: 79px;'">

    <q-toolbar class="q-py-none justify-between"
               v-bind:style="$q.screen.lt.md ? 'height: 65px;' : 'height: 79px;'">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menú"
        @click="leftDrawerOpen = !leftDrawerOpen"
      >
        <q-tooltip :delay="3000" anchor="bottom middle" self="top left">Menú</q-tooltip>
      </q-btn>

      <q-toolbar-title>
        <q-btn
          to="/"
          title="Inovatech"
          :ripple="false"
          class="q-px-none q-pr-sm-sm no-border no-border-radius no-box-shadow no-outline no-shadow no-hovereable"
        >
          <img
            class=""
            style="max-width: 170px; max-height: 80px;"
            height="90"
            width="300"
            src="/img/logos/inovatech_logo_blanco.png"
            alt="Inovatech App."
          />
        </q-btn>
      </q-toolbar-title>

        <div class="q-gutter-x-sm row items-center no-wrap">

          <AccountButton/>

          <NotificationButton/>

        </div>

    </q-toolbar>

  </q-header>

  <NavigationMenu
    v-model="leftDrawerOpen"
  />

</template>

<script setup lang="ts">
import {ref} from 'vue';
import NotificationButton from 'components/common/NotificationButton.vue';
import AccountButton from 'components/common/AccountButton.vue';
import NavigationMenu from 'components/common/NavigationMenu.vue';

const leftDrawerOpen = ref(false)

</script>
