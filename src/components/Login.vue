<template>
  <div class="container container-table">
      <div class="row vertical-20p">
        <div class="container">
          <form class="ui form loginForm"  @submit.prevent="checkCreds">
            <div class="field vertical-20p">
              <label class="label">Username</label>
              <div class="control">
                <input class="input" v-bind:class="{ 'is-danger': this.$v.$dirty && this.$v.username.$invalid }" type="email" placeholder="username" v-model="username">
              </div>
            </div>

            <div class="field vertical-20p">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" v-bind:class="{ 'is-danger': this.$v.$dirty && this.$v.password.$invalid }" type="password"  v-model="password">
              </div>
            </div>

            <div class="field is-grouped vertical-20p">
              <div class="control control-center">
                <button class="button is-primary" v-bind:class="loading">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import api from '../api'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      username: '',
      password: '',
      loading: ''
    }
  },
  validations: {
    username: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    checkCreds () {
      // make form dirty
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.toggleLoading()

        const {username, password} = this
        this.$store.commit('TOGGLE_LOADING')

        /* Making API call to authenticate a user */
        api.request('post', '/auth/token', {username, password})
          .then(response => {
            var data = response.data
            /* Checking if error object was returned from the server */
            console.log(data)

            /* Setting user in the state and caching record to the localStorage */
            if (data.token) {
              var token = 'Bearer ' + data.token

              // this.$store.commit('SET_USER', data.user)
              this.$store.commit('SET_TOKEN', token)

              if (window.localStorage) {
                // window.localStorage.setItem('user', JSON.stringify(data.user))
                window.localStorage.setItem('token', token)
              }

              this.$router.push(data.redirect ? data.redirect : '/')
            }

            this.toggleLoading()
          })
          .catch(error => {
            this.$store.commit('TOGGLE_LOADING')

            console.log(`MODE MOCK !! (${error})`)
            var token = 'Bearer ' + 'mock token'

            // this.$store.commit('SET_USER', data.user)
            this.$store.commit('SET_TOKEN', token)

            if (window.localStorage) {
              // window.localStorage.setItem('user', JSON.stringify(data.user))
              window.localStorage.setItem('token', token)
            }

            this.toggleLoading()

            this.$router.push('/')
          })
      }
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'is-loading' : ''
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
}
.container-table {
    display: table;
    color: white;
}
.vertical-20p {
  padding-top: 20%;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.control-center {
  text-align: center;
}
.input-group input {
  height: 4em;
}
</style>
