<template>
  <div class="orders">
    <h2>Your Order History</h2>
  </div>
</template>

<script>

export default {
  name: 'Orders',
  data: () => ({
    orders: []
  }),
  mounted: async function() {
    this.orders = await this.getOrders();
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