<template>
  <div class="container jumbotron">
    <div class="searchMyGalleries">
      <searchField @search="search"/>
    </div>
    <div class="my-container">
      <template v-if="galleries">
        <div v-for="gallery in galleries" :key="gallery.id" class="my-galleries">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" :src="gallery.images[0].url" alt="Card image cap">
            <div class="card-body">
              <router-link :to="{ name: 'single-gallery', params: {id: Number(gallery.id)} }">
                <h5 class="card-title">{{ gallery.name }}</h5>
              </router-link>
              <router-link :to="{ name: 'authors-galleries', params: {id: Number(gallery.user.id)} }">
                <p class="card-text">{{gallery.user.first_name}} {{gallery.user.last_name}}</p>
              </router-link>
              <p class="card-text">{{gallery.created_at}}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <h1>Empty</h1>
      </template>
    </div>
    <button
      v-show="page != lastPage"
      @click="loadMore"
       class="btn btn-secondary"
       type="button"
      >
       Load More
     </button>
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
    galleryService.myGalleries()
    .then(res => {
      next(vm => {
        vm.galleries = res.data
        vm.lastPage = res.last_page
      })
    })
  },
  data(){
    return {
      galleries: [],
      lastPage: null,
      page: 1,
      term: null
    }
  },
  methods: {
    loadMore(){
      this.page++
      galleryService.myGalleries(this.term, this.page)
      .then( res => {
        this.galleries.push(...res.data)
      })
    },
    search(term){
      this.page = 1
      this.term = term
      this.galleries = {}
      galleryService.myGalleries(this.term, this.page)
      .then( (res)  => {
        this.galleries = res.data
        this.lastPage = res.last_page

      })
    }
  }
}
</script>

<style lang="css">
.searchMyGalleries{
  width: 300px;
  margin: auto;
  margin-bottom: 20px;
}
</style>
