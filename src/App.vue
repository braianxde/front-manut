<template>
  <v-main>
    <v-app style="min-height: 100vh;">
      <v-main>
        <router-view name="menu"/>
        <router-view/>
      </v-main>
      <Footer></Footer>
    </v-app>

  </v-main>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer
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
