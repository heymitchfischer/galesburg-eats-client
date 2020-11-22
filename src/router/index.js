import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Orders from '../views/Orders.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/sign_in',
    name: 'Sign In',
    component: Auth
  },
  {
    path: '/:slug?',
    name: 'Home',
    component: Home
  }
  // {
  //   path: '/sign_in',
  //   name: 'Sign In',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/sign_in') {
    if (store.state.auth) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else if (store.state.auth) {
    next();
  } else {
    next({ name: 'Sign In' });
  }
})

export default router;
