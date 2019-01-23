<template>
  <div>
    <v-toolbar-title v-if="logged"><i class="fas fa-user"></i> {{ currentUser.username }}</v-toolbar-title>
    <div v-if="!logged">
      <input class="login-input" type="text" v-model="username" placeholder="Username" />
      <v-btn color="success" small @click="login()">
        <i class="fas fa-user"></i>Login
      </v-btn>
    </div>
  </div>
</template>

<script>
import HttpHandler from '@/model/services/HttpHandler'
import CookieHandler from '@/model/services/CookieHandler'

export default {
  name: 'User',
  props: {
    cities: Array
  },
  data () {
    return {
      currentUser: {},
      username: '',
      host: 'http://localhost:3000',
      logged: false
    }
  },
  methods: {
    async handleSuccess (data) {
      this.currentUser = data
      await CookieHandler.saveKey('user', this.currentUser)
      this.username = ''
      this.logged = true
      this.$emit('online')
    },
    async login () {
      let result = await HttpHandler.request(`${this.host}/users/${this.username}`, 'GET')
      if (result.status === 200) {
        this.handleSuccess(result.data)
      } else {
        result = await HttpHandler.request(`${this.host}/users`, 'POST', { username: this.username })
        if (result.status === 201) {
          this.handleSuccess(result.data)
        }
      }
    }
  },
  async beforeCreate () {
    let user = await CookieHandler.getCookie('user')
    if (user) {
      this.currentUser = user
      this.logged = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-input{
  border: solid 1px #888;
  width: 90px;
  border-radius: 5px;
   box-shadow:inset 1px 1px 1px 1px #888;
    background: #fff;
  margin-right: 20px;
  padding: 0px 10px;
}
i {
  margin-right: 10px;
}
</style>
