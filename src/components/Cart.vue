<template>
  <div class="cart">
    <h4 class="pa-4">Your Order</h4>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="item in itemsInCart" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{ item.menu_item_name }}</v-list-item-title>
          <v-list-item-subtitle>{{ convertToDollars(item.price) }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action @click="openRemoveItemDialog(item)">
          <v-icon>mdi-delete</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider inset></v-divider>
    <div class="text-right pa-4">
      <p><strong>Order Total:</strong> {{ orderTotal }}</p>
    </div>
    <div class="checkoutBtnContainer">
      <v-btn color="primary" class="checkoutBtn py-6" @click="checkout">Checkout</v-btn>
    </div>

    <RemoveItemDialog
      :open="removeItemDialogOpen"
      :item="itemBeingRemoved"
      @input="value => removeItemDialogOpen = value"
      @remove="removeFromCart"
    >
    </RemoveItemDialog>
  </div>
</template>

<style scoped>
  .checkoutBtnContainer {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: 3px solid white;
  }

  .checkoutBtn {
    border-radius: 0;
    width: 100%;
  }
</style>

<script>
import RemoveItemDialog from '@/components/RemoveItemDialog.vue'
import { convertToDollars } from '@/misc/helpers.js';

export default {
  data: () => ({
    removeItemDialogOpen: false,
    itemBeingRemoved: {}
  }),

  components: {
    RemoveItemDialog
  },

  mounted: function() {
    this.$store.dispatch('getItemsInCart');
  },

  methods: {
    removeFromCart: function(item) {
      this.removeItemDialogOpen = false;
      this.itemBeingRemoved = {};
      this.$store.dispatch('removeItemFromCart', { item: item });
    },

    checkout: function() {
      this.$store.dispatch('checkout').then( order => {
        this.$router.push({ path: `/orders/${order.id}` });
        this.$store.dispatch('getItemsInCart');
      }).catch( error => {
        console.log(error);
      });
    },

    openRemoveItemDialog: function(item) {
      this.itemBeingRemoved = item;
      this.removeItemDialogOpen = true;
    },

    convertToDollars
  },

  computed: {
    itemsInCart: function() {
      return this.$store.state.cart.items;
    },

    orderTotal: function() {
      let total = 0;

      this.itemsInCart.forEach(item => {
        total += item.price;
      });

      return this.convertToDollars(total);
    }
  },
}
</script>
