import galleryService from '../services/GalleryService'
import router from '../router/router.js'

export default {
  state: {
    galleries: null,
    gallery_errors: null,
  },
  mutations: {
    SET_GALLERY_DATA(state, payload){
      state.galleries = payload.data;
      state.gallery_errors = null;
    },
    SET_ERRORS(state, payload){
      state.errors = payload
    }
  },

  actions: {
    async setGalleries({ commit }){
      try {
        let galleries = await galleryService.getAll();
        commit('SET_GALLERY_DATA', galleries)
      } catch (error) {
          commit('SET_ERRORS', error.response ? error.response.data.errors : error);
      }
    }
  },

  getters: {
    getGalleries(state){
      return state.galleries;
    }
  }
}
