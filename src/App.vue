<template>
  <v-app id="inspire">
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>

    <v-footer
      app
      color="primary"
      class="white--text"
    >
      <span>Main Street Codes</span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    data() {
      return {
        layout: 'div',
      };
    },

    created: function() {
      if (localStorage.getItem('auth') === null) {
        this.$store.dispatch('getItemsInCart');
      } else {
        this.$store.dispatch('autoSignIn').then(() => {
          this.$store.dispatch('getItemsInCart');
        });
      }
    },
  };
</script>
