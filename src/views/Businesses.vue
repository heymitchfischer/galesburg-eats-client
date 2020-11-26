<template>
  <div class="businesses">
    <v-card elevation="4" class="ma-6" v-for="business in businesses" :key="business.id" v-on:click="moveToBusiness(business)">
      <v-row>
        <v-col cols="12" sm="4" class="pa-0" align-self="center">
          <v-img
            height="250px"
            width="100%"
            :src="business.image_url"
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
            <p class="truncate">{{ business.description }}</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<style scoped>
  .truncate {
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 2; /* number of lines to show */
     -webkit-box-orient: vertical;
  }
</style>

<script>
  import Dashboard from '../layouts/Dashboard.vue';

  export default {
    name: 'Businesses',

    data: () => ({
      businesses: []
    }),

    created() {
      this.$emit('update:layout', Dashboard);
    },

    mounted: async function() {
      this.businesses = await this.getBusinesses();
    },

    methods: {
      moveToBusiness: async function(business) {
        this.$router.push({ path: `/${business.slug}` });
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
      }
    }
  }
</script>
