<template>
  <div class="business">
    <h2 class="text-center">{{ business.name }}</h2>
    <Menu :menu="selectedMenu"/>
  </div>
</template>

<script>
  import Menu from '@/components/Menu.vue'

  export default {
    props: {
      business: Object
    },
    components: {
      Menu
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
