import authService from '../services/AuthService'
import router from '../router/router.js'

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
}

export default {
  state: {
    user: getUserFromLocalStorage(),
    token: localStorage.getItem('token'),
    auth_errors: null,
    register_errors: null
  },
  mutations: {
    SET_DATA(state, {user, token}){
      state.user = user,
      state.token = token,
      state.auth_errors = null
    },
    SET_ERRORS(state, payload){
      state.auth_errors = payload
    },
    SET_REGISTER_ERRORS(state, payload){
      state.register_errors = payload
    }
  },
  actions: {
    async login( { commit }, {email, password}){
      try {
        const {user, token} = await authService.login(email, password);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        authService.setAuthHeaders(token);
        commit('SET_DATA', { user, token });
        router.push({name:'home'})

      } catch (error){
          commit('SET_ERRORS', error.response ? error.response.data : error);
      }
    },

    logout({commit}){
      authService.setAuthHeaders();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      commit('SET_DATA', {user: null, token: null})
      router.push({name: 'login'})
    },

    async register( { commit },{ email, first_name, last_name, password, password_confirmation} ){
      try {
        const {user, token} = await authService.register( email,first_name, last_name, password, password_confirmation);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        authService.setAuthHeaders(token);
        commit('SET_DATA', {user, token});
        router.push({name: 'home'});
      } catch (error){
          commit('SET_REGISTER_ERRORS', error.response ? error.response.data.errors : error);
      }
    }

  },
  getters: {
    getUser(state){
      return state.user
    },
    getAuthErrors(state){
      return state.auth_errors
    },
    getRegisterErrors(state){
      return state.register_errors
    }
  }
}
