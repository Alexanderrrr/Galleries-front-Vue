<template>
    <div>
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="gallery.images[0].url" alt="Card image cap">
        <div class="card-body">
          <router-link :to="{ name: 'single-gallery', params: {id: Number(gallery.id)} }">
            <h5 class="card-title">{{ gallery.name }}</h5>
          </router-link>
          <router-link :to="{ name: 'authors-gallery', params: {id: Number(gallery.user.id)} }">
            <p class="card-text">{{gallery.user.first_name}} {{gallery.user.last_name}}</p>
          </router-link>
          <p class="card-text">{{gallery.created_at}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['gallery']
}
</script>

<style lang="css">

</style>
