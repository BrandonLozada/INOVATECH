import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)

let baseURL = ''
let apiCopomexURL = ''
let apiCatalogosMtyURL = ''

baseURL = 'https://localhost:44357/api' //baseURL = 'https://127.0.0.1:44357/api'
apiCopomexURL = 'https://api.copomex.com/query/'
apiCatalogosMtyURL = 'https://api.monterrey.gob.mx/rest/v1'

const apiController = new AbortController();
const api = axios.create({baseURL: baseURL});
const apiCopomex = axios.create({baseURL: apiCopomexURL});
const apiMty = axios.create({baseURL: apiCatalogosMtyURL});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, apiCopomex, apiMty, apiController };
