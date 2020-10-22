<template>
  <v-content>
    <v-app style="min-height: 100vh;">
      <v-content>
        <Navbar/>
        <router-view/>
      </v-content>
    </v-app>
    <Footer></Footer>
  </v-content>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
