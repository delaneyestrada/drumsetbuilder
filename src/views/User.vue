<template>
<div id="user">
    <b-container fluid="sm">
        <!-- <b-row align-h="center">
        <b-col md="6">
        <b-form class="p-5">
            <b-form-text text-variant='light' tag="h2">Reset Password</b-form-text>
            <b-form-group label="Password" label-class="text-light" label-for="user-password">
                <b-form-input id="user-password" type="password" :state="validateState('userForm.password')"
                    data-form="user" v-model.trim="$v.userForm.password.$model"></b-form-input>
                <b-form-invalid-feedback v-if="!$v.userForm.password.minLength">Password must be at least 8 characters
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.userForm.password.required">Password is required
                </b-form-invalid-feedback>

            </b-form-group>
            <b-form-group label="Repeat Password" label-class="text-light" label-for="user-repeat-password">
                <b-form-input id="user-repeat-password" type="password" :state="validateState('userForm.repeatPassword')"
                    data-form="user" v-model.trim="$v.userForm.repeatPassword.$model"></b-form-input>
                <b-form-invalid-feedback id="user-repeat-password-feedback">Does not match password
                </b-form-invalid-feedback>

            </b-form-group>
            <b-button type="submit" variant="secondary">
                Submit
            </b-button>
        </b-form>
        </b-col>
        </b-row> -->
        <b-alert :show="showAlert" dismissable fade variant="primary">Password Reset Email Sent</b-alert>
        <main>
        <div class="section">
          <h2 class="text-light">Actions</h2>
          <div class="action-buttons">
          <b-button variant="secondary" @click="resetPassword">Send Password Reset Email</b-button>
          </div>
        </div>
        <div class="section">
        <h2 class="text-light">Builds</h2>
        <BuildListComponent class="pb-5" deleteButton />
        </div>
        </main>
    </b-container>
</div>
</template>

<script>
// import {
//   validationMixin
// } from "vuelidate";
// import { required, sameAs } from "vuelidate/lib/validators";
import {mapState} from 'vuex'
import BuildListComponent from '../components/BuildListComponent'

export default {
  name: 'User',
  // mixins: [validationMixin],
  components: {
      BuildListComponent
  },
  data(){
    return {
      dismissSeconds: 4,
      showAlert: 0
    }
  },
  computed: mapState(['user']),
  methods: {
    resetPassword() {
      this.$emit('reset-password', this.user.userProfile.email)
      this.showAlert = this.dismissSeconds
    }
  },
  // methods: {
  //     validateState(name) {
  //     let objArr = name.split('.')
  //     const {
  //       $dirty,
  //       $error
  //     } = this.$v[objArr[0]][objArr[1]];
  //     return $dirty ? !$error : null;
  //   }
  // }
}
</script>

<style scoped>
    main {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2em;
      margin-top: 3em;
    }
    .action-buttons button {
      margin: 1em;
    }
</style>
