<template>
  <div class="cart">
    <h4>Cart</h4>
    <v-list dense>
      <v-list-item @click="removeFromCart(item)" v-for="item in itemsInCart" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{ item.menu_item_name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-btn color="primary" @click="checkout">Checkout</v-btn>
  </div>
</template>

<script>
  export default {
    computed: {
      itemsInCart: function() {
        return this.$store.state.cart.items;
      }
    },
    methods: {
      removeFromCart: function(item) {
        this.$store.dispatch('removeItemFromCart', { item: item });
      },

      checkout: function() {
        this.$store.dispatch('checkout').then(() => {
          this.$store.dispatch('getItemsInCart');
        });
      }
    }
  }
</script>
