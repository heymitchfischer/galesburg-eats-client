<template>
  <div class="business">
    <div class="banner-container">
      <router-link to="/" class="back-button">
        <v-btn class="float-left white--text" text>
          <v-icon color="white">mdi-arrow-left</v-icon>
          Back
        </v-btn>
      </router-link>
      <img :src="business.image_url" class="elevation-4 banner-image">
    </div>
    <h2 class="text-center">{{ business.name }}</h2>
    <v-row class="justify-center">
      <v-col cols="10" sm="6" md="4">
        <v-select
          :items="business.menus"
          v-model="selectedMenu"
          name="menu"
          item-text="name"
          label="Select a menu"
          dense
          solo
          return-object
        ></v-select>
      </v-col>
    </v-row>
    <Menu :menu="selectedMenu" @selectMenuItem="value => selectedMenuItem = value"/>
    <AddItemDialog
      :open="menuItemIsSelected"
      :item="selectedMenuItem"
      @input="selectedMenuItem = {}"
      @add="addSelectedMenuItemToCart"
    >
    </AddItemDialog>
  </div>
</template>

<style scoped>
  .back-button {
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .back-button button {
    background-color: #FF4632;
  }

  .banner-container {
    position: relative;
  }

  .banner-image {
    width: 100%;
    max-height: 280px;
    object-position: center top;
    object-fit: cover;
  }
</style>

<script>
  import Menu from '@/components/Menu.vue';
  import Dashboard from '../layouts/Dashboard.vue';
  import AddItemDialog from '@/components/AddItemDialog.vue'

  export default {
    name: 'Business',

    data: () => ({
      business: {},
      selectedMenuItem: {},
      selectedMenu: {}
    }),

    components: {
      Menu,
      AddItemDialog
    },

    created() {
      this.$emit('update:layout', Dashboard);
    },

    mounted: async function() {
      this.business = await this.getBusiness(this.$route.params.slug);
      this.selectedMenu = this.business.menus[0];
    },

    methods: {
      getBusiness: async function(slug) {
        const response = await fetch(`http://localhost:3000/businesses/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (await response.status === 200) {
          const result = await response.json();
          return result;
        }
      },

      addSelectedMenuItemToCart: function() {
        console.log(this.selectedMenuItem);
      }
    },

    computed: {
      menuItemIsSelected: function() {
        if (Object.entries(this.selectedMenuItem).length === 0) {
          return false;
        }

        return true;
      }
    }
  }
</script>
