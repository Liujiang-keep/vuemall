import Vue from 'vue'
import VueRouter from "vue-router";

const Home = () =>import('../views/home/Home')
const Categary = () =>import('../views/categary/Categary')
const Cart = () =>import('../views/cart/Cart')
const Mys = () =>import('../views/mys/Mys')
const Detail=()=>import('../views/detail/Detail')

Vue.use(VueRouter)

const router =new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      component:Home
    } ,
    {
      path: '/categary',
      component:Categary
    } ,
    {
      path: '/cart',
      component:Cart
    } ,
    {
      path: '/mys',
      component:Mys
    } ,
    {
      path:'/detail',
      component:Detail
    }
  ],
  mode:'history'
})

export default router