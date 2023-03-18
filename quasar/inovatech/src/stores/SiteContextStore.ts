import { defineStore } from 'pinia'

// TODO: Este es solo un ejemplo de un estado de pinia.
export const useContextStore = defineStore('SiteContextStore', {
  state: () => ({
    selectedProduct: toString(),
    currentPage: toString(),
  }),

  actions: {
  },
  getters: {
  },
})
