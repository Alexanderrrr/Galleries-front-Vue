import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import HomePage from '../components/HomePage.vue'
import SingleGallery from '../components/gallery/SingleGallery.vue'
import CreateNewGallery from '../components/gallery/CreateNewGallery.vue'
import EditGallery from '../components/gallery/EditGallery.vue'
import MyGalleries from '../components/gallery/MyGalleries.vue'
import AuthorsGallery from '../components/gallery/AuthorsGallery.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:HomePage,
    name:'home'
  },

  {
    path:'/galleries/:id',
    component:SingleGallery,
    name:'single-gallery'
  },
  {
    path:'/my-galleries',
    component:MyGalleries,
    meta:{auth:true},
    name:'my-galleries'
  },
  {
    path:'/create',
    component:CreateNewGallery,
    meta:{auth:true},
    name:'create-new-gallery'
  },
  {
    path: '/edit/:id',
    component: EditGallery,
    name:'edit-gallery'

  },
  {
    path:'/login',
    component: Login,
    meta:{guest:true},
    name:'login'
  },
  {
    path:'/register',
    component:Register,
    meta:{guest:true},
    name:'register'
  },
  {
    path:'/authors-galleries/:id',
    component:AuthorsGallery,
    meta:{auth:true},
    name:'authors-galleries'
  },
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
