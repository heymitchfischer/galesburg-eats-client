import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'
import Order from '../views/Order.vue'
import Orders from '../views/Orders.vue'
import Business from '../views/Business.vue'
import Businesses from '../views/Businesses.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: {
      // Does user need to be logged in to access route?
      requiresAuth: true,
      // Does user need to be NOT logged in to access route?
      requiresGuest: false
    }
  },
  {
    path: '/orders/:orderID',
    name: 'Order',
    component: Order,
    meta: {
      requiresAuth: false,
      requiresGuest: false
    }
  },
  {
    path: '/sign_in',
    name: 'Sign In',
    component: Auth,
    meta: {
      requiresAuth: false,
      requiresGuest: true
    }
  },
  {
    path: '/sign_up',
    name: 'Sign Up',
    component: Auth,
    meta: {
      requiresAuth: false,
      requiresGuest: true
    }
  },
  {
    path: '/',
    name: 'Businesses',
    component: Businesses,
    meta: {
      requiresAuth: false,
      requiresGuest: false
    }
  },

  // This should always be the last route since it is basically a catch-all. It doesn't need to be
  // this way; we could do /businesses/:slug or /restaurants/:slug but this makes for a cleaner URL,
  // especially for restaurants that don't have a website and want something accessible and easy to
  // remember.
  {
    path: '/:slug',
    name: 'Business',
    component: Business,
    meta: {
      requiresAuth: false,
      requiresGuest: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // Attempt auto-sign-in if necessary before moving forward
  if (store.getters.isLoggedOut && localStorage.getItem('auth')) {
    store.dispatch('autoSignIn').then(() => {
      if (to.meta.requiresAuth && store.getters.isLoggedOut) {
        next({ path: '/sign_in' });
      }

      if (to.meta.requiresGuest && store.getters.isLoggedIn) {
        next({ path: '/' });
      }

      next();
    });
  // Otherwise just move to next route
  } else {
    if (to.meta.requiresAuth && store.getters.isLoggedOut) {
      next({ path: '/sign_in' });
    }

    if (to.meta.requiresGuest && store.getters.isLoggedIn) {
      next({ path: '/' });
    }

    next();
  }
});

export default router;
