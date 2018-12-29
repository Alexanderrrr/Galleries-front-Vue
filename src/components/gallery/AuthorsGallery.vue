<template lang="html">
  <div>
    <div class="searchMyGalleries">
      <searchField @search="search"/>
    </div>
    <div class="my-container">
      <template v-if="authorsGalleries">
        <div v-for="gallery in authorsGalleries" :key="gallery.id" class="my-galleries">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" :src="gallery.images[0].url" alt="Card image cap">
            <div class="card-body">
              <router-link :to="{ name: 'single-gallery', params: {id: Number(gallery.id)} }">
                <h5 class="card-title">{{ gallery.name }}</h5>
              </router-link>
                <p v-if="gallery.user" class="card-text">{{gallery.user.first_name}} {{gallery.user.last_name}}</p>
              <p class="card-text">{{gallery.created_at}}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <h1>Loading...</h1>
      </template>
    </div>
  </div>
</template>

<script>
import galleryService from './../../services/GalleryService'
import searchField from '../partials/SearchField'

export default {
  components:{
    searchField
  },
  beforeRouteEnter(to, from, next){
      next(vm => {
        galleryService.authorsGalleries(vm.$route.params.id)
        .then( res => vm.authorsGalleries = res.data)
      })
  },
  data(){
    return {
      authorsGalleries: [],
      lastPage: null,
      page: 1,
      term: null
    }
  },
  methods: {
    loadMore(){
      this.page++
      galleryService.authorsGalleries(this.term, this.page)
      .then( res => {
        this.authorsGalleries.push(...res.data)
      })
    },
    search(term){
      this.page = 1
      this.term = term
      this.authorsGalleries = {}
      galleryService.authorsGalleries(this.term, this.page, this.$route.params.id)
      .then( (res)  => {
        this.authorsGalleries = res.data
        this.lastPage = res.last_page

      })
    }
  }
}
</script>

<style lang="css">
</style>
