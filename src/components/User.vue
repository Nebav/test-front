<template>
  <div class="user">
    <p>{{ currentUserLabel }}</p>
    <input type="text" v-model="username" placeholder="Username" />
    <button @click="login()">Login / Create</button>
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
      currentUser: null,
      currentUserLabel: '',
      username: '',
      host: 'http://localhost:3000'
    }
  },
  methods: {
    async handleSuccess (data) {
      this.currentUser = data
      this.currentUserLabel = 'Logged as : ' + this.currentUser.username
      await CookieHandler.saveKey('user', this.currentUser)
    },
    async login () {
      let result = await HttpHandler.request(`${this.host}/users/${this.username}`, 'GET')
      if (result.status === 200) {
        this.handleSuccess(result.data)
      } else {
        result = await HttpHandler.request(`${this.host}/users`, 'POST', { username: this.username })
        if (result.status === 200) {
          this.currentUser = result.data
        }
      }
    }
  },
  async mounted () {
    let user = await CookieHandler.getCookie('user')
    if (user) {
      this.currentUser = user
      this.currentUserLabel = 'Logged as : ' + this.currentUser.username
    } else {
      this.currentUserLabel = 'Please log-in to see your bookmarks'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
