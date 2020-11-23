<template>
  <v-app id="inspire">
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>

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
  export default {
    name: 'App',
    data() {
      return {
        layout: 'div',
      };
    },
    created: function() {
      this.$store.dispatch('validateCookie').then(() => {
        this.$store.dispatch('getItemsInCart');
      });
    },
  };
</script>
