<template lang="html">
  <div class="my-container">
    <template v-if="authorsGalleries">
      <div v-for="gallery in authorsGalleries" :key="gallery.id" class="my-galleries">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" :src="gallery.images[0].url" alt="Card image cap">
          <div class="card-body">
            <router-link :to="{ name: 'single-gallery', params: {id: Number(gallery.id)} }">
              <h5 class="card-title">{{ gallery.name }}</h5>
            </router-link>
            <router-link :to="{ name: 'authors-gallery', params: {id: Number(gallery.user.id)} }">
              <p v-if="gallery.user" class="card-text">{{gallery.user.first_name}} {{gallery.user.last_name}}</p>
            </router-link>
            <p class="card-text">{{gallery.created_at}}</p>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <h1>Loading...</h1>
    </template>
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
