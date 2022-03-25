<template>
  <v-app id="inspire" class="dashboard">
    <v-navigation-drawer v-model="drawerRight" app clipped right>
      <Cart/>
    </v-navigation-drawer>

    <v-app-bar app clipped-right color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Galesburg Eats</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$router.push('/sign_in')" v-if="$store.getters.isLoggedOut">Sign In</v-btn>
      <v-badge
        :content="amountOfItemsInCart"
        :value="amountOfItemsInCart"
        color="primary"
        offset-x="20"
        offset-y="20"
        overlap
      >
        <v-app-bar-nav-icon class="ml-4" @click.stop="drawerRight = !drawerRight">
          <v-icon>mdi-cart</v-icon>
        </v-app-bar-nav-icon>
      </v-badge>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <div class="greetingContainer py-4 px-4" v-if="$store.getters.isLoggedIn">
        <h1 class="white--text">Hi, {{ $store.getters.currentUser.firstName }}!</h1>
      </div>

      <v-list dense>
        <v-list-item @click="$router.push('/')">
          <v-list-item-action>
            <v-icon>mdi-food-fork-drink</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Restaurants</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push('/orders')" v-if="$store.getters.isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-receipt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Order History</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push('/profile')" v-if="$store.getters.isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push('/contact')">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact Us (WIP)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push('/about')">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About (WIP)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="signOut" v-if="$store.getters.isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot/>
    </v-main>
  </v-app>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .greetingContainer {
    width: 100%;
    border-bottom: 3px solid white;
    background-color: #FF4632;
  }
</style>

<script>
import Cart from '@/components/Cart.vue'

export default {
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false
  }),

  components: {
    Cart
  },

  methods: {
    signOut: function() {
      this.$store.dispatch('signOut').then(() => {
        this.$router.push({ name: 'Sign In' });
      });
    }
  },

  computed: {
    businessSelected: function() {
      return Object.keys(this.business).length !== 0;
    },

    amountOfItemsInCart: function() {
      return this.$store.state.cart.items.length;
    }
  }
}
</script>
