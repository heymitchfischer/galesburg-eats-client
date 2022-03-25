<template>
  <div class="add-item-dialog text-center">
    <v-dialog
      v-model="dialogOpen"
      width="500"
    >
      <v-card>
        <v-card-title class="headline lighten-2">
          {{ item.name }}
        </v-card-title>

        <v-card-text>
          {{ convertToDollars(item.price) }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text v-show="errorMessage" class="error-message-text red--text">
          {{ errorMessage }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="close()"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red"
            text
            @click="add()"
          >
            Add to Order
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
  .error-message-text {
    margin-top: 10px;
  }
</style>

<script>
import { convertToDollars } from '@/misc/helpers.js';

const CART_ERROR_MESSAGES = {
  new_item_business_id_does_not_match: 'You have started an order with a different business. Remove your current items or checkout first before starting a new order.'
}

const DEFAULT_CART_ERROR_MESSAGE = 'Something isn\'t working correctly. We\'re looking into it.';

export default {
  props: {
    open: Boolean,
    item: Object
  },

  data: () => ({
    errorMessage: null
  }),

  watch: {
    open: function () {
      this.errorMessage = null;
    }
  },

  methods: {
    close: function() {
      this.$emit('input', false);
    },

    add: async function() {
      this.errorMessage = null;

      try {
        await this.$store.dispatch('addItemToCart', { item: this.item });
        this.close();
      } catch(error) {
        this.errorMessage = this.findErrorMessage(error);
      }
    },

    findErrorMessage: function(error) {
      let message = CART_ERROR_MESSAGES[error];

      if (message) {
        return message;
      }

      return DEFAULT_CART_ERROR_MESSAGE;
    },

    convertToDollars
  },

  computed: {
    dialogOpen: {
      get () { return this.open },
      set (value) { this.$emit('input', value) },
    },
  }
}
</script>
