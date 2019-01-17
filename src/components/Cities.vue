<template>
  <div class="cities">
    <div v-for="city in cities" :key="city.position">
      {{ city.name }} - Population : {{ city.population }} Habitants
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cities',
  props: {
    cities: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
