<template>
  <v-container>
    <v-layout>
      <div class="home">
        <User />
        <hr>
        <DogList :dogs="dogs" />
      </div>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DogList from '@/components/DogList.vue'
import User from '@/components/User.vue'
import HttpHandler from '@/model/services/HttpHandler'

export default {
  name: 'home',
  components: {
    DogList,
    User
  },
  data () {
    return {
      userDogs: null,
      dogs: null,
      host: 'http://localhost:3000'
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
  }
}
</script>
