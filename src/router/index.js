import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign_in',
    name: 'Sign In',
    component: Auth
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
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if(to.path === '/sign_in') { next(); }

  // If user is logged in, go to next path
  let loggedIn = false;
  if(loggedIn) {
    next();

  // else redirect to sign in path
  } else {
    next({ path: '/sign_in' });
  }
})

export default router;
