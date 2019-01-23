<template>
  <v-layout justify-center>
        <v-container>
          <v-card>
              <v-img :src="dog.img">
                <v-container
                  fill-height
                  fluid
                  pa-2>
                  <v-layout fill-height>
                    <v-flex align-end flexbox>
                      <v-chip v-if="showPosition" color="green" text-color="white">{{ dog.position }}</v-chip>
                      <span class="headline black--text dog-name" v-text="dog.name"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-card-actions v-if="idUser">
                <v-spacer></v-spacer>
                 <v-flex align-content-end align-baseline>
                  <i v-if="!showPosition" class="far fa-heart" @click="addDog()"></i>
                  <i v-if="showPosition" class="far fa-times-circle"></i>
                </v-flex>
              </v-card-actions>
            </v-card>
        </v-container>
        <v-snackbar v-model="snackbar" :timeout="6000" :top="true" color="success">
          Added a "{{ dog.name }}" to your favs
        </v-snackbar>
  </v-layout>
</template>
<script>
import HttpHandler from '@/model/services/HttpHandler'
export default {
  name: 'DogCard',
  props: {
    dog: {
      type: Object,
      default: null
    },
    showPosition: {
      type: Boolean,
      default: false
    },
    idUser: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      snackbar: false,
      host: 'http://localhost:3000'
    }
  },
  methods: {
    handleSuccess (data) {
      this.snackbar = true
    },
    handleError () {

    },
    async addDog () {
      let result = await HttpHandler.request(`${this.host}/dogs/add`, 'POST', { idUser: this.idUser, idDog: this.dog.id })
      if (result.status === 201) {
        this.handleSuccess(result.data)
      } else {
        this.handleError()
      }
    }
  }
}
</script>
<style scoped>
.dog-name {
  background: rgba(255, 255, 255, 0.6);
  padding: 5px;
  border-radius: 10px;
}
i {
  font-size: 28px;
  margin-left: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

i:hover {
  font-size: 35px;
  color: red;
}
</style>
