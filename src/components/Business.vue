<template>
  <div class="business">
    <p>{{ business.name }}</p>
  </div>
</template>

<script>

export default {
  props: {
    business: Object
  }
}
</script>
