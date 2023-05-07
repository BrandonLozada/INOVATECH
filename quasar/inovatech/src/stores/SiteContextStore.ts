import { defineStore } from 'pinia'

export const useContextStore = defineStore('SiteContextStore', {
  state: () => ({
    selectedRequest: '',
    currentPage: '',
  }),

  actions: {
  },
  getters: {
  },
})
