<template>
  <v-layout row wrap class="dogs" v-if="dogs">
      <v-flex v-for="(dog, index) in dogs" :key="dog.id">
        <div v-if="sortable" class="text-md-center">
          <v-btn v-if="index > 0" color="success" small @click="$emit('moveUpDog', dog)">
            <i class="fas fa-chevron-circle-left"></i>
          </v-btn>
          <v-btn v-if="index < dogs.length - 1" color="success" small @click="$emit('moveDownDog', dog)">
            <i class="fas fa-chevron-circle-right"></i>
          </v-btn>
        </div>
        <DogCard :dog="dog" :showPosition="sortable" :idUser="idUser" @delete="deleteDog"/>
      </v-flex>
  </v-layout>
</template>

<script>
import DogCard from '@/components/DogCard'

export default {
  name: 'DogList',
  components: {
    DogCard

  },
  props: {
    dogs: {
      type: Array,
      default: null
    },
    sortable: {
      type: Boolean,
      default: false
    },
    idUser: {
      type: String,
      default: ''
    }
  },
  methods: {
    deleteDog (dog) {
      this.$emit('delete', dog)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .dogs {
  display: flex;
  width: 100%;
} */
</style>
