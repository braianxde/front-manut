<template>
  <v-dialog v-model="dialogCriarChamado" max-width="500px">
    <v-card>
      <span>{{ this.nomeUsuario }}</span>
    </v-card>
  </v-dialog>
</template>

<script>
import Util from "@/plugins/Util";

export default {
  name: "CriarChamadoDialog",
  props: {
    value: Boolean,
  },
  created() {
    this.nomeUsuario = Util.getInfoUsuario().nome;
  },
  data: () => ({
    nomeUsuario: ""
  }),
  computed: {
    dialogCriarChamado: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>