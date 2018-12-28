<template>
  <div class="container jumbotron">
      <div class="my-container">
        <h1 v-if="!galleries">There is no created galleries yet</h1>
        <template v-else>
          <div v-for="(gallery, key) in galleries" :key="key" class="my-galleries">
             <gallery-row :gallery="gallery" />
          </div>
        </template>
      </div>
      <button
        v-show="lastPage > 1"
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
  },
  data(){
    return {
      galleries: null,
      lastPage: 0,
      page: 1
    }
  },
  methods: {
    loadMore(){
      this.lastPage--
      this.page++
      galleryService.getAll(this.page)
      .then( res => {
        this.galleries.push(...res.data)
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
