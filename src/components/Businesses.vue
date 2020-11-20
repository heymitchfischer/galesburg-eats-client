<template>
  <div>
    <v-card elevation="4" class="ma-6" v-for="business in businesses" :key="business.id" v-on:click="moveToBusiness(business)">
      <v-row>
        <v-col cols="12" sm="4" align-self="center">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="8" align-self="center">
          <v-card-title>{{ business.name }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="my-4 subtitle-1">
                {{ business.address }}
              </div>
            </v-row>
            <div>{{ business.description }}</div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      businesses: Array
    },

    methods: {
      moveToBusiness: async function(business) {
        this.$router.push({ path: `/${business.slug}` });
      }
    }
  }
</script>
