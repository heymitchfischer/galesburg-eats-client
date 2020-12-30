import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Orders from '../views/Orders.vue'
import Business from '../views/Business.vue'
import Businesses from '../views/Businesses.vue'
// import store from '../store'

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
    path: '/sign_up',
    name: 'Sign Up',
    component: Auth
  },
  {
    path: '/',
    name: 'Businesses',
    component: Businesses
  },
  {
    path: '/:slug',
    name: 'Business',
    component: Business
  },
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

// router.beforeEach((to, from, next) => {
//   console.log(store.getters.isLoggedIn);
//   if (to.name === 'Sign In' || to.name === 'Sign Up') {
//     if (store.getters.isLoggedIn) {
//       next({ name: 'Businesses' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
