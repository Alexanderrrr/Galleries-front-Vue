import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import HomePage from '../components/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/', component:HomePage, name:'home'},
  {path:'/login', component: Login,name:'login'},
  {path:'/register', component:Register, name:'register'},
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
