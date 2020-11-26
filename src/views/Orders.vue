<template>
  <div class="orders">
    <h2>Your Order History</h2>
    <v-card elevation="4" class="ma-6" v-for="order in orders" :key="order.id">
      <v-row>
        <v-col cols="12" sm="4" class="pa-0" align-self="center">
          <v-img
            height="250px"
            width="100%"
            :src="order.business_image_url"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="8" align-self="center">
          <v-card-title>{{ order.business_name }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="my-4 subtitle-1">
                {{ order.id }}
              </div>
              <div class="my-4 subtitle-2">
                {{ order.created_at }}
              </div>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import Dashboard from '../layouts/Dashboard.vue';

  export default {
    name: 'Orders',

    data: () => ({
      orders: []
    }),

    created() {
      this.$emit('update:layout', Dashboard);
    },

    mounted: async function() {
      if (this.$store.state.auth) {
        this.orders = await this.getOrders();
      }
    },

    watch: {
      '$store.state.auth': async function() {
        if (this.$store.state.auth) {
          this.orders = await this.getOrders();
        }
      }
    },

    methods: {
      getOrders: async function() {
        const response = await fetch('http://localhost:3000/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Jwt-Auth': 'user_web_client',
            'Authorization': this.$store.state.auth
          }
        });

        if (await response.status === 200) {
          const result = await response.json();
          console.log(result);
          return result;
        }
      }
    }
  }
</script>
