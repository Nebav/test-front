<template>
  <div class="home">
    <User />
    <Cities :cities="cities" />
  </div>
</template>

<script>
// @ is an alias to /src
import Cities from '@/components/Cities.vue'
import User from '@/components/User.vue'
import HttpHandler from '@/model/services/HttpHandler'

export default {
  name: 'home',
  components: {
    Cities,
    User
  },
  data () {
    return {
      cities: null,
      host: 'http://localhost:3000'
    }
  },
  methods: {
    handleSuccess (data) {
      this.cities = data
      console.log(this.cities)
    },
    handleError () {
      console.log('error')
    }
  },
  async mounted () {
    let result = await HttpHandler.request(`${this.host}/cities`, 'GET')
    if (result.status === 200) {
      this.handleSuccess(result.data)
    } else {
      console.log('AN ERROR OCCURED')
    }
  }
}
</script>
