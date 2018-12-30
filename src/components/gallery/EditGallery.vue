<template>
  <form @submit.prevent="submitForm" class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Edit Gallery</h1>

    <label for="inputGalleryName" class="sr-only">Name of the Gallery</label>
    <input v-model="name" type="text" id="inputGalleryName" class="form-control" placeholder="Gallery Name" required>

    <label for="inputDescription">Description</label>
    <textarea id="inputDescription" class="form-control" rows="8" cols="80"
        v-model="description"
        placeholder="Describe your gallery here...">
    </textarea>

    <div class="imgUrlContainer">
      <label>You need to input at least 1 image url</label>
      <span id="imgSpan" v-for="(num, key) in images" :key="key">
        <input
            v-model="images[key].url"
            type="url"
            id="inputImageUrl"
            class="form-control"
            placeholder="url must end with jpg,png or jpeg"
            pattern="https?://.+(png|jpg|jpeg)"
            title="Url must be https:// and end with jpg,png or jpeg"
        />
        <a v-show="counter > 1" @click.prevent="removeInput(key)" class="badge badge-danger" href="#">Remove</a>
        <div>
          <a @click.prevent="moveInputUp(key)" class="badge badge-primary" href="#">Move Up</a>
          <a @click.prevent="moveInputDown(key)" class="badge badge-secondary" href="#">Move Down</a>
        </div>
      </span>
    </div>
    <button @click="createInput" id="addField" type="button" class="outline-secondary" >Add Another URL</button>
    <span>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Edit</button>
      <button @click="cancel" class="btn btn-lg btn-secondary btn-block" type="button">Cancel</button>
    </span>

    <template v-if="errors">
      <ul>
        <li v-for="err in errors" :key="err.id" class="alert alert-danger rounded">{{ err }}</li>
      </ul>
    </template>
  </form>
</template>

<script>
import galleryService from './../../services/GalleryService'
export default {
  beforeRouteEnter(to, from, next){
    next(vm => {
      galleryService.show(Number(vm.$route.params.id))
      .then(data => {
        vm.name = data.name
        vm.description = data.description,
        vm.images = [],
        vm.images = data.images
        vm.counter = vm.images.length
      })
    })
  },
  data(){
    return {
      name: "",
      description: "",
      images: [
        {url: ""},
      ],
      counter: 0,
      errors: null
    }
  },
  methods: {
    submitForm(){
      this.images = this.images.filter(item => item.url !== undefined)
      galleryService.edit({
        name: this.name,
        description: this.description,
        images: this.images,
      }, this.$route.params.id)
      .then( () => this.$router.push({name:'single-gallery', params: {id: Number(this.$route.params.id)}}))
      .catch ( errors => {
        this.errors = errors.response.data.errors
      })

    },
    cancel(){
      this.$router.push({name:'single-gallery', params: {id: Number(this.$route.params.id)}})
    },
    createInput(){
      this.counter ++
      this.images.push({})

    },
    removeInput(key){
      this.images.splice(key,1)
      this.counter--;
    },
    moveInputUp(key){
      if(key) {
        this.images.splice( key - 1, 0, this.images.splice( key, 1 )[0])
      }
    },
    moveInputDown(key) {
      if(key != this.range -1 ) {
        this.images.splice( key + 1, 0, this.images.splice( key, 1 )[0])
      }
    },
  }
}
</script>

<style lang="css">
  #addField {
    margin-bottom: 10px
  }
  #inputImageUrl {
    margin-bottom: 5px;
    border-bottom: 2px solid grey
  }
  #imgSpan {
    border-bottom: 1px solid black
  }
</style>
