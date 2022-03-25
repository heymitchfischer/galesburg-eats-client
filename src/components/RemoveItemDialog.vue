<template>
  <div class="remove-item-dialog text-center">
    <v-dialog
      v-model="dialogOpen"
      width="500"
    >
      <v-card>
        <v-card-title class="headline lighten-2">
          Remove Item
        </v-card-title>

        <v-card-text>
          Would you like to remove <strong>{{ item.menu_item_name }}</strong>?
        </v-card-text>

        <v-divider></v-divider>

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
            @click="remove()"
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    open: Boolean,
    item: Object
  },

  methods: {
    close: function() {
      this.$emit('input', false);
    },

    remove: function() {
      this.$emit('remove', this.item);
    }
  },

  computed: {
    dialogOpen: {
      get () { return this.open },
      set (value) { this.$emit('input', value) },
    },
  }
}
</script>
