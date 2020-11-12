<template>
  <v-main>
    Home
  </v-main>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: 'Home',
  data() {
    return {};
  },
  mounted() {
    axios.get("usuarios");
  }
};
</script>

<style scoped>

</style>