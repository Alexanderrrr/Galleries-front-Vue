<template>
  <div id="app">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 class="my-0 mr-md-auto navbar-brand"><a href="/" id="brandLink">Galleries</a></h5>
        <nav class="my-2 my-md-0 mr-md-3" id="nav-background">
          <router-link class="p-2 text-dark" :to="{name:'home'}">All Galleries</router-link>
          <router-link v-if="user" class="p-2 text-dark" :to="{name:'my-galleries'}">My Galleries</router-link>
          <router-link
            v-if="user"
            class="p-2 text-dark"
            :to="{name:'create-new-gallery'}"
          >Create New Gallery
          </router-link>
          <router-link v-if="!user" class="p-2 text-dark" :to="{name:'login'}">Login</router-link>
          <router-link v-if="!user" class="p-2 text-dark" :to="{name:'register'}">Register</router-link>
          <a v-if="user" href="#" @click="logout" class="p-2 text-dark">Logout</a>
        </nav>
    </div>
    <main role="main">
      <h5 v-if="user" class="my-0 mr-md-auto navbar-brand">{{user.first_name}} {{user.last_name}}</h5>
      <router-view :key="$route.fullPath"/>
    </main>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'app',
  components:{

  },
  methods: {
    ...mapActions(['logout']),

    onClickLogout() {
      this.logout();
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>

<style>
#app {
  font-family: "Comic Sans MS", cursive, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#brandLink:hover {
  color: black;
  text-decoration: none;
}
#brandLink{
  color: black
}
</style>
