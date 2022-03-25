<template>
  <div class="orders-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2>Your Order History</h2>
          <v-card elevation="4" class="ma-6 rounded" v-for="order in orders" :key="order.id" v-on:click="moveToOrder(order.id)">
            <v-row>
              <v-col cols="12" sm="4" class="pa-0" align-self="center">
                <v-img
                  height="200px"
                  width="100%"
                  :src="order.business_image_url"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="8" align-self="center">
                <v-card-title>{{ order.business_name }}</v-card-title>
                <v-card-text>
                  <p class="subtitle-2 ma-0">{{ formatDateTime(order.created_at) }}</p>
                  <p class="subtitle-2 ma-0">Total: {{ computeOrderTotal(order) }}</p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .orders-page {
    height: 100%;
  }

  .back-btn {
    text-decoration: none;
  }
</style>

<script>
import Dashboard from '../layouts/Dashboard.vue';
import { formatDateTime, convertToDollars } from '@/misc/helpers.js';

export default {
  name: 'Orders',

  data: () => ({
    orders: []
  }),

  created() {
    this.$emit('update:layout', Dashboard);
  },

  mounted: async function() {
    this.orders = await this.getOrders();
  },

  methods: {
    getOrders: async function() {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
          'Authorization': this.$store.state.auth
        }
      });

      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        throw result.error;
      }
    },

    moveToOrder: async function(orderID) {
      this.$router.push({ path: `/orders/${orderID}` });
    },

    computeOrderTotal: function(order) {
      let total = 0;

      order.carted_items.forEach(item => {
        total += item.price;
      })

      return this.convertToDollars(total);
    },

    formatDateTime,
    convertToDollars
  }
}
</script>
