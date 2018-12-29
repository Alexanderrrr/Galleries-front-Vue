<template>
  <div>
    <form @submit.prevent="filterGalleries" class="form-inline my-2 my-lg-0">
      <input v-model="term" class="form-control mr-sm-2" type="search" placeholder="filter galleries" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Filter</button>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import galleryService from './../../services/GalleryService'

export default {

  data(){
    return {
      term: "",
    }
  },

  methods: {
    filterGalleries() {
      this.$emit('search', this.term)
    }

  }
}
</script>

<style lang="css">
</style>
