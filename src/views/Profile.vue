<template>
  <div class="profile-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Edit Profile</v-toolbar-title>
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
                      v-model="editProfileForm.firstName"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      label="Last Name"
                      name="last-name"
                      type="text"
                      v-model="editProfileForm.lastName"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-text-field
                  label="Phone Number"
                  name="phone-number"
                  prepend-icon="mdi-phone"
                  type="text"
                  v-model="editProfileForm.phoneNumber"
                ></v-text-field>

                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="text"
                  v-model="editProfileForm.email"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="editProfileForm.password"
                ></v-text-field>

                <v-text-field
                  id="password-confirmation"
                  label="Password Confirmation"
                  name="password-confirmation"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="editProfileForm.passwordConfirmation"
                ></v-text-field>

                <v-text-field
                  id="current-password"
                  label="Current Password"
                  name="current-password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="editProfileForm.currentPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
              <v-card-text v-show="formattedErrors.length > 0" class="red--text text-center">
                <p class="my-0" v-for="error in formattedErrors" :key="error">{{ error }}</p>
              </v-card-text>
            <v-card-actions class="justify-center flex-column">
              <v-btn color="primary" v-on:click="updateProfile">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .profile-page {
    height: 100%;
  }
</style>

<script>
import { formatErrors } from '@/misc/helpers.js';

export default {
  name: 'EditProfile',

  data: function() {
    return {
      editProfileForm: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        currentPassword: ''
      },

      errors: {}
    }
  },

  mounted() {
    this.resetForm();
  },

  methods: {
    updateProfile() {
      this.errors = {};

      this.$store.dispatch('updateProfile', {
        firstName: this.editProfileForm.firstName,
        lastName: this.editProfileForm.lastName,
        phoneNumber: this.editProfileForm.phoneNumber,
        email: this.editProfileForm.email,
        password: this.editProfileForm.password,
        passwordConfirmation: this.editProfileForm.passwordConfirmation,
        currentPassword: this.editProfileForm.currentPassword
      }).then( () => {
        this.resetForm();
      }).catch( errors => {
        console.log(errors);
        this.errors = errors;
      });
    },

    resetForm() {
      this.editProfileForm = {
        firstName: this.$store.getters.currentUser.firstName,
        lastName: this.$store.getters.currentUser.lastName,
        phoneNumber: this.$store.getters.currentUser.phoneNumber,
        email: this.$store.getters.currentUser.email,
        password: '',
        passwordConfirmation: '',
        currentPassword: ''
      }
    },
  },


  computed: {
    formattedErrors: function() {
      return formatErrors(this.errors);
    }
  }
}
</script>
