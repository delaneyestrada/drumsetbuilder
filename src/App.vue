<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" class="mb-3">
      <b-navbar-nav>
        <b-nav-item class="brand" to="/">Drum Set Builder</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/about">About</b-nav-item>
      <b-nav-item-dropdown v-if="user.userProfile" right no-caret class="user-dropdown">
          <template #button-content>
            {{user.userProfile.username.length > 0 ? user.userProfile.username : 'User'}}
          </template>
          <b-dropdown-item :to="`/user/${user.userProfile.username}`">Profile</b-dropdown-item>
          <b-dropdown-item v-on:click="logOut">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        
      <b-nav-item-dropdown right no-caret v-if="!Object.keys(user.userProfile).length" class="user-dropdown">
          <template #button-content>
            Register
          </template>
          <b-nav-form class="p-3" @submit.stop.prevent="registerForm">
            <b-form-invalid-feedback id="register-feedback" :state="!this.register.error">Username and/or email already exists</b-form-invalid-feedback>

            <b-form-group
            label="Username"
            label-for="register-username"
            >
                <b-form-input id="register-username" type="text" :state="validateState('register.username')" data-form="register" v-model.trim="$v.register.username.$model"></b-form-input>
                <b-form-invalid-feedback id="register-username-feedback">Username is required</b-form-invalid-feedback>

            </b-form-group>
            <b-form-group
            label="Email"
            label-for="register-email"
            >
                <b-form-input id="register-email" type="text" :state="validateState('register.email')" data-form="register" v-model.trim="$v.register.email.$model"></b-form-input>
                <b-form-invalid-feedback v-if="!$v.register.email.email">Email be a valid email address</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.register.email.required">Email is required</b-form-invalid-feedback>

            </b-form-group>
            <b-form-group
            label="Password"
            label-for="register-password"
            >
                <b-form-input id="register-password" type="password" :state="validateState('register.password')" data-form="register" v-model.trim="$v.register.password.$model"></b-form-input>
                <b-form-invalid-feedback v-if="!$v.register.password.minLength">Password must be at least 8 characters</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.register.password.required">Password is required</b-form-invalid-feedback>

            </b-form-group>
            <b-form-group
            label="Repeat Password"
            label-for="register-repeat-password"
            >
                <b-form-input id="register-repeat-password" type="password" :state="validateState('register.repeatPassword')" data-form="register" v-model.trim="$v.register.repeatPassword.$model"></b-form-input>
                <b-form-invalid-feedback id="register-repeat-password-feedback">Does not match password</b-form-invalid-feedback>

            </b-form-group>
            <b-button type="submit" variant="secondary">
              Register
            </b-button>
          </b-nav-form>
        </b-nav-item-dropdown>
      <b-nav-item-dropdown right no-caret v-if="!Object.keys(user.userProfile).length" class="user-dropdown">
          <template #button-content>
            Sign In
          </template>
          <b-nav-form class="p-3" @submit.stop.prevent="logIn">
            <b-form-invalid-feedback id="sign-in-feedback" :state="!this.signIn.error">Invalid username or password</b-form-invalid-feedback>
            <b-form-group
            label="Email"
            label-for="sign-in-Email"
            >
                <b-form-input id="sign-in-Email" type="text" data-form="sign-in"  v-model="signIn.email"></b-form-input>
            </b-form-group>
            <b-form-group
            label="Password"
            label-for="sign-in-password"
            >
                <b-form-input id="sign-in-password" type="password" data-form="sign-in" v-model="signIn.password"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="secondary">
              Sign In
            </b-button>
            <b-form-text class="ml-3" tag="a" style="cursor: pointer;" v-b-modal.password-reset-modal>Forgot Password</b-form-text>
          </b-nav-form>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
    <b-modal id="password-reset-modal" title="Reset Password" v-on:ok="resetPassword">
        <b-form-group
              label="Email"
              >
                <b-form-input v-model="passwordReset.email">
                </b-form-input>
              <b-form-text>Password reset link will be sent to the email you used to create the account</b-form-text>
              </b-form-group>
      </b-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {
  validationMixin
} from "vuelidate";
import {
  required,
  minLength,
  sameAs,
  email
} from "vuelidate/lib/validators";
import { auth } from '@/firebase'

export default {
  name: 'App',
  mixins: [validationMixin],
  data() {
    return {
      signIn: {
        email: "",
        password: "",
        error: false,
      },
      register: {
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        error: false,
      },
      passwordReset: {
        email: "",
        error: false
      }
    }
  },
  computed: mapState(['user', 'build']),
  validations: {
    register: {
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(8)
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs('password')
      },
      email: {
        required,
        email
      }
    }
  },
  created() {
    // if (window.localStorage.auth != "null" && window.localStorage.auth != "false") {
    //   this.persisted.authenticated = true
    // } else {
    //   this.persisted.authenticated = false
    // }
    // this.persisted.username = window.localStorage.username.replace(/"/g, '')
    // this.persisted.userId = window.localStorage.userId.replace(/"/g, '')
    // this.persisted.authToken = window.localStorage.auth
    // // this.user = {id: window.localStorage.userId, username: window.localStorage.username}
  },
  methods: {
    validateState(name) {
      let objArr = name.split('.')
      const {
        $dirty,
        $error
      } = this.$v[objArr[0]][objArr[1]];
      return $dirty ? !$error : null;
    },
    logIn({authCreds = null}) {
      console.log(authCreds)
      this.$store.dispatch('login', {
        email: this.signIn.email,
        password: this.signIn.password
      })
      // if (authCreds === null) {
      //   authCreds = {
      //     username: this.signIn.username,
      //     password: this.signIn.password
      //   }
      // }
      // fetch('http://localhost:5001/api/users/login', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(authCreds)
      //   })
      //   .then(res => res.json()
      //     .then((data) => {
      //       if (data.success) {
      //         let user = {
      //           id: data.user,
      //           username: data.username
      //         }
      //         window.localStorage.userId = user.id
      //         window.localStorage.username = user.username
      //         window.localStorage.auth = res.headers.get('auth-token')
      //         this.persisted.authenticated = true
      //       } else {
      //         this.persisted.authenticated = false
      //         this.signIn.error = true
      //       }
      //     }))
      //   .catch(err => {
      //     this.signIn.error = true
      //     console.log(err)
      //   })
    },
    logOut() {
      // window.localStorage.auth = false
      // window.localStorage.username = null
      // window.localStorage.userId = null
      // this.persisted.authenticated = false
      this.$store.dispatch('logout')
      if(this.$route.name !== 'home'){
        this.$router.push({path: '/'})
      }
    },
    registerForm() {
      this.$v.register.$touch();
      if (this.$v.register.$anyError) {
        return;
      }
      let registerData = {
        username: this.register.username,
        password: this.register.password,
        email: this.register.email,
      }
      console.log(registerData)
      this.$store.dispatch('register', registerData)
      // fetch('http://localhost:5001/api/users/register', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(registerData)
      //   })
      //   .then(res => res.json()
      //     .then((data) => {
      //       if (data.success) {
      //         let authCreds = {
      //           username: this.register.username,
      //           password: this.register.password,
      //         }
      //         this.logIn(authCreds)
      //       } else {
      //         this.register.error = true
      //       }
      //     }))
      //   .catch(err => {
      //     this.register.error = true
      //     console.log(err)
      //   })
    },
    async resetPassword() {
    try {
    await auth.sendPasswordResetEmail(this.passwordReset.email)
    this.showSuccess = true
  } catch (err) {
    this.passwordReset.error = err.message
  }
  }
  },
  

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  height: 100%;
  background-color: #1a1a1a;
}
html, body, .modal {
    font-family: 'Montserrat', sans-serif;
}
body {
  max-width: 100%;
  overflow-x: hidden;
}

.brand {
  font-family: "Exo 2", sans-serif;
  font-size: 1.2rem;
}

.nav-link {
  font-weight: 600;
}

/* .form-group label {
  width: 100%;
} */

.form-group {
  padding-bottom: 1rem;
  width: 100%;
}

.user-dropdown .nav-link {
  color: #fff !important;
}
/* body {
  background-color: #1a1a1a;
  height: 100%;
} */
</style>
