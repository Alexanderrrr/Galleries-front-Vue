<template>
  <form @submit.prevent="submitForm" class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Create New Gallery</h1>
    <label for="inputGalleryName" class="sr-only">Name of the Gallery</label>
    <input v-model="name" type="text" id="inputGalleryName" class="form-control" placeholder="Gallery Name" required>
    <label for="inputDescription">Description</label>
    <textarea id="inputDescription" class="form-control" rows="8" cols="80"
        v-model="description"
        placeholder="Describe your gallery here...">
    </textarea>
    <div class="imgUrlContainer">
      <label>You need to input at least 1 image url</label>
      <span id="imgSpan" v-for="(num, key) in counter" :key="key">
        <input
            v-model="images[key].url"
            type="url"
            id="inputImageUrl"
            class="form-control"
            placeholder="url"
            pattern="(?=.*\d).{8,}"
        />
        <a v-show="num > 1" @click.prevent="removeInput(key)" class="badge badge-danger" href="#">Remove</a>
        <div>
          <a @click.prevent="moveInputUp(key)" class="badge badge-primary" href="#">Move Up</a>
          <a @click.prevent="moveInputDown(key)" class="badge badge-secondary" href="#">Move Down</a>
        </div>
      </span>
    </div>
    <button @click="createInput" id="addField" type="button" class="btn" >Add Another URL</button>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Create</button>
    <template v-if="errors">
      <ul>
        <li v-for="err in errors" :key="err.id" class="p-3 mb-2 alert alert-danger rounded">{{ err[0] }}</li>
      </ul>
    </template>
  </form>
</template>

<script>
import galleryService from './../../services/GalleryService'
export default {
  data(){
    return {
      name: "",
      description: "",
      images: [
        {url: ""},
      ],
      counter: 1,
      errors: []
    }
  },
  methods: {
    submitForm(){
      galleryService.create({
        name: this.name,
        description: this.description,
        images: this.images
      })
    },

    createInput(){
      this.counter ++
      this.images.push({url: ""})

    },
    removeInput(key){
      this.counter--
      this.images.splice(key,1);
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
