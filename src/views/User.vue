<template>
<div id="user">
    <b-container fluid="sm">
        <b-row align-h="center">
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
        </b-row>
        <h2 class="text-light">Builds</h2>
        <BuildListComponent class="pb-5" deleteButton />
    </b-container>
</div>
</template>

<script>
import {
  validationMixin
} from "vuelidate";
import { required, sameAs } from "vuelidate/lib/validators";

import BuildListComponent from '../components/BuildListComponent'

export default {
  name: 'User',
  mixins: [validationMixin],
  components: {
      BuildListComponent
  },
  data() {
    return {
      userForm: {
        password: "",
        repeatPassword: "",
        error: false,
      }
    }
  },
  validations: {
    userForm: {
      password: {
        required
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
      validateState(name) {
      let objArr = name.split('.')
      const {
        $dirty,
        $error
      } = this.$v[objArr[0]][objArr[1]];
      return $dirty ? !$error : null;
    }
  }
}
</script>

<style scoped>
    
</style>
