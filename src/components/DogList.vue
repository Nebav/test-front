<template>
  <v-layout row wrap class="dogs" v-if="dogs">
    <v-flex v-for="dog in dogs" :key="dog.id" xs4>
      <DogCard :dog="dog" />
      <!-- {{ dog.name }} <img :src="dog.img" /> -->
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
