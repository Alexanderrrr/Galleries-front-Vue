<template>
  <div class="container jumbotron">
      <h5 class="my-0 mr-md-auto navbar-brand">All Galleries Page</h5>
    <div class="searchMyGalleries">
      <searchField @search="search"/>
    </div>
      <div class="my-container">
        <h1 v-if="!galleries">There is no created galleries yet</h1>
        <template v-else>
          <div v-for="(gallery, key) in galleries" :key="key" class="my-galleries">
             <gallery-row :gallery="gallery" />
          </div>
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
import galleryRow from '../components/gallery/GalleryRow'
import galleryService from '../services/GalleryService'
import searchField from './partials/SearchField'

export default {
  beforeRouteEnter(to, from, next){
      next(vm => {
        galleryService.getAll()
        .then( res => {
          vm.galleries = res.data
          vm.lastPage = res.last_page
        })
      })
  },
  name: "home",
  components:{
    galleryRow,
    searchField
  },
  data(){
    return {
      galleries: null,
      lastPage: null,
      page: 1,
      term: null
    }
  },
  methods: {
    loadMore(){
      this.page++
      galleryService.getAll(this.term, this.page)
      .then( res => {
        this.galleries.push(...res.data)
      })
    },
    search(term){
      this.page = 1
      this.term = term
      this.galleries = {}
      galleryService.getAll(this.term, this.page)
      .then( (res)  => {
        this.galleries = res.data
        this.lastPage = res.last_page

      })
    }
  }
}
</script>

<style lang="css">
.my-container {
  display: flex;
  flex-wrap: wrap;
}
.my-galleries{
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid grey;
}
#searchField {
  margin: auto;
}
</style>
