<template>
  <div class="menuItem">
    <v-card elevation="4" class="ma-6" v-on:click="$emit('selectMenuItem', menuItem)">
      <v-row>
        <v-col cols="12" align-self="center">
          <v-card-title>{{ menuItem.name }}</v-card-title>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      menuItem: Object
    },
    methods: {
    }
  }
</script>
