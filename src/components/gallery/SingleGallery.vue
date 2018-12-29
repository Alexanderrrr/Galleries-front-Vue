<template>
  <div class="container">
    <ul class="list-group myCarouselClass">
      <li class="list-group-item"><b>Name of the Gallery:</b> {{gallery.name}}</li>
      <li v-if="gallery.user" class="list-group-item"><b>Created By:</b> {{gallery.user.first_name}} {{gallery.user.last_name}}</li>
      <li class="list-group-item"><b>Created at:</b> {{gallery.created_at}}</li>
      <li class="list-group-item"><b>Gallery Description:</b> {{ gallery.description }}</li>
    </ul>
    <div id="myCarousel">
      <b-carousel
        id="carousel1"
        controls
        indicators
        :interval="4000"
        v-model="slide"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
      <div v-for="image in gallery.images" :key="image.id">
        <a :href="image.url" target="_blank">
          <b-carousel-slide>
            <img
              slot="img"
              class="d-block img-fluid w-100"
              :src="image.url"
              alt="image slot"
            >
            </b-carousel-slide>
          </a>
      </div>
      </b-carousel>
    </div>
  </div>

</template>

<script>
import galleryService from './../../services/GalleryService'

export default {

  beforeRouteEnter(to, from, next){
    next(vm => {
      galleryService.show(Number(vm.$route.params.id))
      .then(data => vm.gallery = data)
    })
  },
  data(){
    return {
      gallery: {},
      slide: 0,
      sliding: null
    }
  },
  methods: {
  onSlideStart (slide) {
    this.sliding = true
  },
  onSlideEnd (slide) {
    this.sliding = false
  }
}
}
</script>

<style lang="css">
#myCarousel{
  width: 30rem;
  margin: auto;
}
.myCarouselClass{
  width: 30rem;
  margin: auto;
}
</style>
