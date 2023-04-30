<template>
  <div  class="row items-center justify-evenly" style="max-width: 1100px; margin: 0 auto;">
    <div class="col-12 col-md-10 col-lg-10" v-bind:class="$q.screen.lt.sm ? 'q-py-md' : 'q-pa-xl'">
      <div class="text-center">
        <p style="font-size: 30px; margin: 0 0 2px 0;">Completa el formulario</p>
        <p class="text-grey-8" style="font-size: 0.875rem; font-weight: 400;">Asegúrate que tus datos sean correctos</p>
      </div>
          <div class="row justify-center align-center">
            <div class="col-xs-12">
              <div class="q-py-sm">

                <UserForm v-if="this.$route.path === '/forms/user'"/>
                <RequestPermissionForm v-if="this.$route.path === '/forms/request-permission'"/>




                <ProfileEmployeeForm v-if="this.$route.path === '/forms/profile-employee'"/>
                <AddressForm v-if="this.$route.path === '/forms/address'"/>
                <PersonalDataForm v-if="this.$route.path === '/forms/data'"/>

              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserForm from 'components/forms/UserForm.vue';
import RequestPermissionForm from 'components/forms/RequestPermissionForm.vue';




import ProfileEmployeeForm from 'components/forms/ProfileEmployeeForm.vue';
import PersonalDataForm from 'components/forms/PersonalDataForm.vue';
import AddressForm from 'components/forms/AddressForm.vue';
</script>
