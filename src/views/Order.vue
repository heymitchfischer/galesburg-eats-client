<template>
  <div class="order-page">
    <v-container v-if="loading" fill-height fluid>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            size="50"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else fluid>
      <v-row>
        <v-col cols="12">
          <router-link to="/orders" class="back-btn">
            <v-icon color="primary">mdi-arrow-left</v-icon>
            View all orders
          </router-link>

          <h2 class="mt-4">Your Order from {{ order.business_name }}</h2>
          <p>Placed on {{ formatDateTime(order.created_at) }}</p>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item v-for="item in order.carted_items" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.menu_item_name }}</v-list-item-title>
                <v-list-item-subtitle>{{ convertToDollars(item.price) }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <div class="text-left pa-4">
            <p><strong>Order Total:</strong> {{ orderTotal }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .order-page {
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
    name: 'Order',

    data: () => ({
      order: {},
      loading: true
    }),

    created() {
      this.$emit('update:layout', Dashboard);
    },

    mounted: async function() {
      this.getOrder(this.$route.params.orderID).then( order => {
        this.order = order;
        this.loading = false;
      }).catch( error => {
        console.log(error);
      });
    },

    methods: {
      getOrder: async function(orderID) {
        const response = await fetch(`http://localhost:3000/orders/${orderID}`, {
          method: 'GET',
          credentials: 'include',
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

      formatDateTime,
      convertToDollars
    },

    computed: {
      orderTotal: function() {
        let total = 0;

        this.order.carted_items.forEach(item => {
          total += item.price;
        })

        return this.convertToDollars(total);
      }
    }
  }
</script>
