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
              <v-card-actions>
                <v-spacer></v-spacer>
                 <v-flex align-content-end align-baseline>
                  <i v-if="!showPosition" class="far fa-heart"></i>
                  <i v-if="showPosition" class="far fa-times-circle"></i>
                </v-flex>
              </v-card-actions>
            </v-card>
        </v-container>
  </v-layout>
</template>
<script>
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
