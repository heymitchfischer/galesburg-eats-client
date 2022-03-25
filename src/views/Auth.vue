<template>
  <div class="auth">
    <SignIn v-if="isSignIn"/>
    <SignUp v-else/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import Default from '../layouts/Default.vue';

export default {
name: 'Auth',

created() {
  this.$emit('update:layout', Default);
},

computed: {
  isSignIn() {
    return this.$route.name === 'Sign In'
  }
},

components: {
  SignIn,
  SignUp
}
}
</script>
