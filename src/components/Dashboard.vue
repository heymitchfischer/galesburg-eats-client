<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <v-list dense>
        <v-list-item @click.stop="right = !right">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Temporary Drawer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="blue-grey"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" v-on:click="test">Test</v-btn>
      <v-btn color="primary" v-on:click="signOut">Sign Out</v-btn>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item @click.stop="left = !left">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Temporary Drawer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    ></v-navigation-drawer>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <Businesses :businesses="businesses" v-show="!businessSelected"/>
          <div v-show="businessSelected">
            <v-btn color="primary" v-on:click="unselectBusiness">Back</v-btn>
            <Business :business="business"/>
          </div>
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

<script>
  import Businesses from '@/components/Businesses.vue';
  import Business from '@/components/Business.vue'

  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
      businesses: [],
      business: {}
    }),

    components: {
      Businesses,
      Business
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
          return result.businesses;
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
          return result.business;
        }
      },

      unselectBusiness: function() {
        this.business = {};
      }
    },

    watch: {
      async $route(to) {
        this.business = await this.getBusiness(to.params.slug);
      }
    },

    computed: {
      businessSelected: function() {
        return Object.keys(this.business).length !== 0;
      }
    }
  }
</script>