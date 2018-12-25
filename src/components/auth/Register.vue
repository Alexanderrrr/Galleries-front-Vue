<template>
  <form @submit.prevent="submitForm">
    <h1 class="h3 mb-3 font-weight-normal">Please Register</h1>
    <label for="inputUserName" class="sr-only">First Name</label>
    <input v-model="first_name" type="text" id="inputFirstName" class="form-control" placeholder="First Name" required>
    <label for="inputUserName" class="sr-only">Last Name</label>
    <input v-model="last_name" type="text" id="inputLastName" class="form-control" placeholder="Last Name" required>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
    <p v-for="err in errors" class="p-3 mb-2 alert alert-danger rounded">{{ err[0] }}</p>
    <label for="inputPassword" class="sr-only">Password</label>
    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
    <label for="inputPassword" class="sr-only">Confirm Password</label>
    <input v-model="password_confirmation" type="password" class="form-control" placeholder="Enter Password Again" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
    <template v-if="errors">
      <ul>
        <li v-for="err in errors" class="p-3 mb-2 alert alert-danger rounded">{{ err[0] }}</li>
      </ul>
    </template>
  </form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data(){
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: null,
      password_confirmation: null,
    }
  },
  methods: {
    ...mapActions(['register']),
    submitForm(){
      this.register({
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
    }
  },
  computed: {
    ...mapGetters({
      errors: 'getAuthErrors'
    })
  }
}
</script>

<style lang="css">
</style>
