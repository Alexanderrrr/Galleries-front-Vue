<template>
  <div class="container my-container">
    <h1 id="loading" v-if="!galleries">There is no created galleries yet</h1>
    <template v-else>
      <div  v-for="(gallery, key) in galleries" :key="key" >
          <gallery-row :gallery="gallery" />
      </div>
    </template>
  </div>
</template>

<script>
import galleryRow from '../components/gallery/GalleryRow'
import {mapActions, mapGetters} from 'vuex'

export default {
  // beforeRouteEnter(to, from, next){
  //     next(vm => {
  //       vm.setGalleries()
  //     })
  // },
  created(){
    this.setGalleries()
  },

  name: "home",
  components:{ galleryRow },
  data(){
    return {
    
    }
  },

  methods: {
    ...mapActions(['setGalleries'])
  },

  computed: {
    ...mapGetters({
      galleries: 'getGalleries'
    })
  }
}
</script>

<style lang="css">
.my-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  height: 100%;
}

</style>
