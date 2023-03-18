import { defineStore } from 'pinia'

const useUserStore = () => {
  return defineStore('useUserStore', {
    // TODO: Decidir si el idioma de toda variable, función, otras por haber será en inglés o español.
    state: () => ({
      firstTime: null,

      userProfile: {correo: '', contrasenia: '', second_surname: '', birthdate: '', phone_number: ''},
      completedProfile: false,

      user2ndInformation: {second_phone_number: '', second_email: ''},
      completedUser2ndInformation: false,

      userAddresses: [],
      addressFilled: false,

      userBillingAddress: [],
      billingAddressFilled: false,

    }),

    actions: {
    },
    getters: {
    },
})()
}

export {useUserStore};
