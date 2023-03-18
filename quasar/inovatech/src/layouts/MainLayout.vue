<template>
  <q-layout view="lhr LpR lfr">

    <PrincipalNavigation/>

    <q-page-container>
      <router-view />
    </q-page-container>

    <PrincipalFooter></PrincipalFooter>

  </q-layout>
</template>

<script setup lang="ts">
import PrincipalFooter from 'components/common/PrincipalFooter.vue';
import PrincipalNavigation from 'components/common/PrincipalNavigation.vue';
</script>
