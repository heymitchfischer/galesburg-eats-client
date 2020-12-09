<template>
  <div class="menu">
    <h3 class="text-center">{{ menu.name }}</h3>
    <MenuSection
      v-for="menuSection in menu.menu_sections"
      :menuSection="menuSection"
      :key="menuSection.id"
      @selectMenuItem="value => $emit('selectMenuItem', value)"
    />
  </div>
</template>

<script>
  import MenuSection from '@/components/MenuSection.vue'

  export default {
    props: {
      menu: Object
    },
    components: {
      MenuSection
    },
  }
</script>
