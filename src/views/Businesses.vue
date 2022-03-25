<template>
  <div class="businesses-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-hover v-slot="{ hover }" class="ma-6" v-for="business in businesses" :key="business.id">
            <v-card :elevation="hover ? 12 : 6" v-on:click="moveToBusiness(business)">
              <v-row>
                <v-col cols="12" sm="4" class="pa-0" align-self="center">
                  <v-img
                    class="rounded thumbnail-image"
                    height="200px"
                    width="100%"
                    :src="business.image_url"
                    elevation=24
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
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .businesses-page {
    height: 100%;
  }

  .truncate {
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 2; /* number of lines to show */
     -webkit-box-orient: vertical;
  }

  .thumbnail-image {
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12) !important;
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
      const response = await fetch(`${process.env.VUE_APP_API_URL}/businesses`, {
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
