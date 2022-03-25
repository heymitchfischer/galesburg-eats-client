<template>
  <div class="contact-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2>Contact Us (Work in progress)</h2>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .contact-page {
    height: 100%;
  }
</style>

<script>
import Dashboard from '../layouts/Dashboard.vue';

export default {
  name: 'Contact',

  created() {
    this.$emit('update:layout', Dashboard);
  }
}
</script>
