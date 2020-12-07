<template>
  <div class="business">
    <router-link to="/">
      <v-btn color="primary" class="float-left white--text">
        <v-icon color="white">mdi-arrow-left</v-icon>
        Back
      </v-btn>
    </router-link>
    <h2 class="text-center">{{ business.name }}</h2>
    <Menu :menu="selectedMenu"/>
  </div>
</template>

<script>
  import Menu from '@/components/Menu.vue';
  import Dashboard from '../layouts/Dashboard.vue';

  export default {
    name: 'Business',

    data: () => ({
      business: {}
    }),

    components: {
      Menu
    },

    created() {
      this.$emit('update:layout', Dashboard);
    },

    mounted: async function() {
      this.business = await this.getBusiness(this.$route.params.slug);
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
      }
    },

    computed: {
      selectedMenu: function() {
        if (this.business.menus) {
          return this.business.menus[0];
        }

        return {};
      }
    }
  }
</script>
