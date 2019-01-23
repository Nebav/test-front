<template>
  <v-app>
      <v-toolbar app>
        <User v-on:online="setOnlineValue()"/>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn @click="$router.push({name: 'home'})" flat>Dogs List</v-btn>
          <v-btn v-if="online" @click="$router.push({name: 'favs'})" flat>Favs</v-btn>
        </v-toolbar-items>
      </v-toolbar>

    <v-content>
      <v-container>
        <v-layout>

        </v-layout>
      </v-container>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import CookieHandler from '@/model/services/CookieHandler'
import User from '@/components/User.vue'

export default {
  name: 'App',
  components: {
    User
  },
  data () {
    return {
      user: null,
      online: false
    }
  },
  methods: {
    setOnlineValue () {
      this.online = true
    }
  },
  async mounted () {
    this.user = await CookieHandler.getCookie('user')
    if (this.user) {
      this.online = true
    }
  }
}
</script>
