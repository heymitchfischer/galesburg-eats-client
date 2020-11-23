<template>
  <div class="orders">
    <h2>Your Order History</h2>
    <p v-for="order in orders" :key="order.id">{{ order.id }}</p>
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
