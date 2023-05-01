import {api} from 'boot/axios'
import * as cookies from 'js-cookie';

export default {
  setUserLogged(userLogged: any) {
    cookies.set('userLogged', userLogged);
  },
  getUserLogged() {
    return cookies.get('userLogged');
  },
  register(email: never, password: never) {
    const user = { email, password };
    return api.post('regiser', user);
  },
  login(email: never, password: never) {
    const user = { email, password };
    return api.post('/Usuario/IdentificarUsuario/', user);
  }
};
