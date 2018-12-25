import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import HomePage from '../components/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/', component:HomePage,meta:{auth:true}, name:'home'},
  {path:'/login', component: Login,meta:{guest:true},name:'login'},
  {path:'/register', component:Register,meta:{guest:true}, name:'register'},
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (isAuthenticated && to.meta.guest) {
    return next({ name: 'home' })
  }
  if (!isAuthenticated && to.meta.auth) {
    return next({ name: 'login' })
  }

  return next();
});

export default router
