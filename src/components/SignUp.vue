<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Sign Up</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="First Name"
                        name="first-name"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="signUpForm.firstName"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field
                        label="Last Name"
                        name="last-name"
                        type="text"
                        v-model="signUpForm.lastName"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-text-field
                    label="Phone Number"
                    name="phone-number"
                    prepend-icon="mdi-phone"
                    type="text"
                    v-model="signUpForm.phoneNumber"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="signUpForm.email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="signUpForm.password"
                  ></v-text-field>

                  <v-text-field
                    id="password-confirmation"
                    label="Password Confirmation"
                    name="password-confirmation"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="signUpForm.passwordConfirmation"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-text v-show="formattedErrors.length > 0" class="red--text text-center">
                <p class="my-0" v-for="error in formattedErrors" :key="error">{{ error }}</p>
              </v-card-text>
              <v-card-actions class="justify-center flex-column">
                <v-btn color="primary" v-on:click="signUp">Create Account</v-btn>
                <p class="mt-8 mb-0">Already have an account?</p>
                <router-link to="/sign_in">Sign in here</router-link>
                <router-link to="/">Or continue as guest</router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { formatErrors } from '@/misc/helpers.js';

export default {
  props: {
    source: String,
  },

  data: function() {
    return {
      signUpForm: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },

      errors: {}
    }
  },

  methods: {
    signUp() {
      this.errors = {};

      this.$store.dispatch('signUp', {
        firstName: this.signUpForm.firstName,
        lastName: this.signUpForm.lastName,
        phoneNumber: this.signUpForm.phoneNumber,
        email: this.signUpForm.email,
        password: this.signUpForm.password,
        passwordConfirmation: this.signUpForm.passwordConfirmation
      }).then( () => {
        this.$store.dispatch('getItemsInCart');
        this.$router.push({ name: 'Businesses' });
      }).catch( errors => {
        this.errors = errors;
      });
    }
  },

  computed: {
    formattedErrors: function() {
      return formatErrors(this.errors);
    }
  }
}
</script>
