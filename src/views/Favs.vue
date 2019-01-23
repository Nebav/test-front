<template>
  <v-container>
    <div class="title-page">
      Favorite dogs
    </div>
    <v-divider :inset="true"></v-divider>
    <v-layout>
      <div class="favs">
        <DogList :dogs="dogs" :sortable="true" :idUser="idUser" @moveUpDog="moveUpDog" @moveDownDog="moveDownDog" @delete="deleteDog"/>
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
  name: 'favs',
  components: {
    DogList
  },
  data () {
    return {
      dogs: null,
      host: 'http://localhost:3000',
      idUser: ''
    }
  },
  methods: {
    async deleteDog (dog) {
      this.dogs = this.dogs.filter(current => current.idDog !== dog.idDog)
      await this.updateUserDogs()
    },
    async moveUpDog (dog) {
      let dogIndex = this.dogs.findIndex(current => current.idDog === dog.idDog)
      this.dogs[dogIndex - 1].position++
      this.dogs[dogIndex].position--
      await this.updateUserDogs()
    },
    async moveDownDog (dog) {
      let dogIndex = this.dogs.findIndex(current => current.idDog === dog.idDog)
      this.dogs[dogIndex + 1].position--
      this.dogs[dogIndex].position++
      await this.updateUserDogs()
    },
    handleSuccess (data) {
      this.dogs = data
    },
    handleError () {
      console.log('error')
    },
    async updateUserDogs () {
      let result = await HttpHandler.request(`${this.host}/dogs/update`, 'POST', { id: this.idUser, userDogs: this.dogs })
      if (result.status > 200) {
        await this.getUserDogs()
      }
    },
    async getUserDogs () {
      let result = await HttpHandler.request(`${this.host}/dogs/userdogs/${this.idUser}`, 'GET')
      if (result.status === 200) {
        this.handleSuccess(result.data)
      } else {
        this.handleError()
      }
    }
  },
  async mounted () {
    this.user = await CookieHandler.getCookie('user')
    if (this.user) {
      this.idUser = this.user.id
      await this.getUserDogs()
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
