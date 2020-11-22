<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <Cart/>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="blue-grey"
      dark
    >
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" v-on:click="test">Test</v-btn>
      <v-btn color="primary" v-on:click="signOut">Sign Out</v-btn>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <transition name="fade">
              <Businesses :businesses="businesses" v-show="!businessSelected"/>
            </transition>

            <transition name="fade">
              <div v-show="businessSelected">
                <v-btn color="primary" class="float-left" v-on:click="unselectBusiness">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <Business :business="business"/>
              </div>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    ></v-navigation-drawer>

    <v-footer
      app
      color="blue-grey"
      class="white--text"
    >
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
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
  import Businesses from '@/components/Businesses.vue';
  import Business from '@/components/Business.vue'
  import Cart from '@/components/Cart.vue'

  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawerRight: null,
      right: false,
      businesses: [],
      business: {}
    }),

    components: {
      Businesses,
      Business,
      Cart
    },

    mounted: async function() {
      this.businesses = await this.getBusinesses();

      if (this.$route.params.slug) {
        this.business = await this.getBusiness(this.$route.params.slug);
      }
    },

    methods: {
      signOut: function() {
        this.$store.dispatch('signOut').then(() => {
          this.$store.dispatch('removeCookie');
          this.$router.push({ name: 'Sign In' });
        });
      },

      test: function() {
        this.$store.dispatch('test');
      },

      getBusinesses: async function() {
        const response = await fetch('http://localhost:3000/businesses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (await response.status === 200) {
          const result = await response.json();
          return result;
        }
      },

      getBusiness: async function(slug) {
        const response = await fetch(`http://localhost:3000/businesses/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (await response.status === 200) {
          const result = await response.json();
          console.log(result);
          return result;
        }
      },

      unselectBusiness: function() {
        this.$router.push({ name: 'Home' });
        this.business = {};
      }
    },

    watch: {
      async $route(to) {
        if (to.params.slug) {
          this.business = await this.getBusiness(to.params.slug);
        }
      }
    },

    computed: {
      businessSelected: function() {
        return Object.keys(this.business).length !== 0;
      }
    }
  }
</script>