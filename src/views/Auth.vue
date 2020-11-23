<template>
  <div class="auth">
    <SignIn/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/SignIn.vue';
import Default from '../layouts/Default.vue';

export default {
  name: 'Auth',
  created() {
    this.$emit('update:layout', Default);
  },
  components: {
    SignIn
  }
}
</script>
