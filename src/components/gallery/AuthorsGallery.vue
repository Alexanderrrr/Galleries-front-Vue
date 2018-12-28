<template lang="html">
  <div>
    {{authorsGalleries.galleries}}
    <div v-for="gallery in authorsGalleries.galleries" :key="gallery.id">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="gallery.images" alt="Card image cap">
        <div class="card-body">
          <router-link :to="{ name: 'single-gallery', params: {id: Number(gallery.id)} }">
            <h5 class="card-title">{{ gallery.name }}</h5>
          </router-link>
          <p class="card-text">{{gallery.created_at}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import galleryService from './../../services/GalleryService'

export default {
  beforeRouteEnter(to, from, next){
      next(vm => {
        galleryService.authorsGalleries(vm.$route.params.id)
        .then( data => vm.authorsGalleries = data)
      })
  },
  data(){
    return {
      authorsGalleries: []
    }
  }
}
</script>

<style lang="css">
</style>
