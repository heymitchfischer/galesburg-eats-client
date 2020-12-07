<template>
  <v-app id="inspire" class="dashboard">
    <v-navigation-drawer v-model="drawerRight" app clipped right>
      <Cart/>
    </v-navigation-drawer>

    <v-app-bar app clipped-right color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Galesburg Eats</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" v-on:click="signOut">Sign Out</v-btn>
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
      <v-list dense>
        <v-list-item @click="$router.push('/')">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Restaurants</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push('/orders')">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>My Order History</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <slot/>
          </v-col>
        </v-row>
      </v-container>
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
