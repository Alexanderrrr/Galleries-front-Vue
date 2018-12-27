<template>
  <div class="gallery-container">
    <ul class="list-group">
        <router-link :to="{ name: 'single-gallery', params: {id: Number(gallery.id)} }">
          <li class="list-group-item list-group">Gallery Name: {{ gallery.name }}</li>
        </router-link>
        <router-link :to="{ name: 'author', params: {id: Number(gallery.user.id)} }">
          <li class="list-group-item"><strong>Created By: </strong>{{gallery.user.first_name}} {{gallery.user.last_name}}</li>
        </router-link>
        <li class="list-group-item"><img class="img-fluid" :src="gallery.images[0].url"/></li>
        <li class="list-group-item"><strong>Created At: </strong>{{gallery.created_at}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['gallery']
}
</script>

<style lang="css">
  .gallery-container {
    margin-bottom: 20px;
    margin-left: 20px;
    width: 20rem;
    height: 20rem
  }
</style>
