import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import gallery from './gallery'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    gallery
  }
});

export default store;
