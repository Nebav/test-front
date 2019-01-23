<template>
  <v-container>
    <div class="title-page">
      Dogs List
    </div>
    <v-divider :inset="true"></v-divider>
    <v-layout>

      <div class="home">
        <DogList :dogs="dogs" :idUser="idUser" />
      </div>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DogList from '@/components/DogList.vue'
import HttpHandler from '@/model/services/HttpHandler'
import CookieHandler from '@/model/services/CookieHandler'

export default {
  name: 'home',
  components: {
    DogList
  },
  data () {
    return {
      userDogs: null,
      user: null,
      dogs: null,
      host: 'http://localhost:3000',
      idUser: ''
    }
  },
  methods: {
    handleSuccess (data) {
      this.dogs = data
    },
    handleError () {
      console.log('error')
    }
  },
  async mounted () {
    let result = await HttpHandler.request(`${this.host}/dogs`, 'GET')
    if (result.status === 200) {
      this.handleSuccess(result.data)
    } else {
      this.handleError()
    }

    this.user = await CookieHandler.getCookie('user')
    if (this.user) {
      this.idUser = this.user.id
    }
  }
}
</script>
<style scoped>
.title-page {
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 30px;
  text-transform: uppercase;
}
</style>
