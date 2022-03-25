<template>
  <div class="about-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2>About Us (Work in progress)</h2>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .about-page {
    height: 100%;
  }
</style>

<script>
import Dashboard from '../layouts/Dashboard.vue';

export default {
  name: 'About',

  created() {
    this.$emit('update:layout', Dashboard);
  }
}
</script>
