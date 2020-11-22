<template>
  <div class="menuSection">
    <v-row>
      <v-col cols="12">
        <h4>{{ menuSection.name }}</h4>
        <v-row>
          <v-col cols="12" sm="6" align-self="center" v-for="menuItem in menuSection.menu_items" :key="menuItem.id">
            <MenuItem :menuItem="menuItem"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import MenuItem from '@/components/MenuItem.vue'

  export default {
    props: {
      menuSection: Object
    },
    components: {
      MenuItem
    }
  }
</script>
