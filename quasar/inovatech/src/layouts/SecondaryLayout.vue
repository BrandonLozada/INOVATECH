<template>
  <q-layout view="lhr LpR lfr">

<!-- TODO: Aquí se puede utilizar un state de pinia para detectar la route,
           igualarla, hacer el .match para hacer un ruteo y un boleano para pintar este componente. -->
    <PrincipalNavigation v-if="this.$route.path !== '/signin' && this.$route.path !== '/signin/'"/>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- TODO: Aquí se puede utilizar un state de pinia para detectar la route,
           igualarla, hacer el .match para hacer un ruteo y un boleano para pintar este componente. -->
<!--    <PrincipalFooter></PrincipalFooter>-->

  </q-layout>
</template>

<script setup lang="ts">
import PrincipalFooter from 'components/common/PrincipalFooter.vue';
import PrincipalNavigation from 'components/common/PrincipalNavigation.vue';
</script>
