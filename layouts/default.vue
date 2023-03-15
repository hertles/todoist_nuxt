<template>
  <v-card max-width="1200" color="grey-lighten-3">
    <v-layout>

      <v-app-bar
          color="teal-darken-4"
          image="https://picsum.photos/1920/1080?random"
      >

        <template v-slot:image>
          <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>


        <v-app-bar-title>Todolist</v-app-bar-title>

        <v-spacer></v-spacer>

      </v-app-bar>

      <v-main class="main">
        <NuxtPage/>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script >

</script>
<style scoped>
  .main{
    width: 50%;
  }
</style>
