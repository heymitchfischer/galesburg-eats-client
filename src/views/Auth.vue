<template>
  <div class="auth">
    <SignIn/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/SignIn.vue'

export default {
  name: 'Auth',
  components: {
    SignIn
  }
}
</script>
