<template>
  <div class="container">
    <ul class="list-group myCarouselClass">
      <li class="list-group-item"><b>Name of the Gallery:</b> {{gallery.name}}</li>
      <li class="list-group-item">
        <b>Created By: </b>
        <router-link :to="{ name: 'authors-galleries', params: {id: Number(galleryUser.id)} }">
          {{galleryUser.first_name}} {{galleryUser.last_name}}
        </router-link>
      </li>
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
      <div v-if="user && galleryUser.id == user.id">
        <button
           @click="deleteGalleryForm(gallery.id)"
           class="btn btn-danger btn-block"
        >Delete Gallery
        </button>
        <router-link
          class="btn btn-secondary btn-block"
          :to="{name:'edit-gallery', params: {id: Number(gallery.id)}}">
          Edit Gallery
        </router-link>
      </div>
      <div>
        <ul class="list-group" id="commentsGroup">
          <h2>Comments For This Gallery</h2>
          <div v-for="(comment, key) in galleryComments" :key="key">
            <li class="list-unstyled"><b>Comment by:</b> {{comment.user.first_name}} {{comment.user.last_name}}</li>
            <li class="list-unstyled"><b>Created at:</b> {{comment.created_at}}</li>
            <ul>
              <li
                id="commentText"
                class="list-group-item"
              >
                <b>Comment:</b>
                {{comment.content}}</br>
                <button v-if="user && comment.user.id == user.id" @click="deleteCommentForm(comment.id, key)" class="btn btn-outline-danger btn-sm">Delete Comment</button>
              </li>
            </ul>
          </div>
        </ul>
      </div>
      <div v-if="!galleryComments">
        <h1>No Comments For This Gallery</h1>
      </div>
      <div v-if="user">
        <form @submit.prevent="addCommentForm">
          <p>Add Comment</p>
          <textarea v-model="content" name="content" rows="8" cols="65"></textarea>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Add Comment</button>
        </form>
      </div>
     </div><!-- end of id myCarousel -->
  </div>
</template>

<script>
import galleryService from './../../services/GalleryService'
import {mapGetters} from 'vuex'

export default {

  beforeRouteEnter(to, from, next){
    next(vm => {
      galleryService.show(Number(vm.$route.params.id))
      .then(data => {
        vm.gallery = data,
        vm.galleryComments = data.comments,
        vm.galleryUser = data.user
      })
    })
  },
  data(){
    return {
      gallery: {},
      slide: 0,
      sliding: null,
      content: '',
      galleryComments: [],
      galleryUser: {}
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },

    deleteGalleryForm(id) {
      if (confirm("Are you sure?")) {
        galleryService.deleteGallery(id)
        .then(() => {this.$router.push({name:'my-galleries'})})
      }
      return
    },

    addCommentForm(){
      galleryService.addComment({
        content: this.content ,
        id: this.$route.params.id
      })
      .then(data => {
        this.galleryComments.push(data),
        this.content = ""
      })
    },

    deleteCommentForm(id, key){
      let answer = confirm("Are you sure?")
      if (answer) {
        this.gallery.comments.splice(key,1)
        galleryService.deleteComment(id)
      }
      return
    }
},

computed: {
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>

<style lang="css">
#myCarousel{
  width: 30rem;
  margin: auto;
  margin-bottom: 20px
}
.myCarouselClass{
  width: 30rem;
  margin: auto;
}
#commentsGroup{
  margin-top: 20px
}
#commentText{
  margin-bottom: 40px;
  border-top: 1px solid grey
}
</style>
