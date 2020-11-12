<template>
  <v-dialog v-model="dialogCriarChamado" max-width="600px"> 
    <v-card>
      <v-card-title class="blue White--text">
        <span class="headline mb-1">Abrir Chamado</span>
      </v-card-title>
      <v-card class="mx-auto mb-2" max-width="580">
        <v-card-text>
          <p class="title sm-1 mb-1 text-left">Solicitante</p>
          <p class="body-2 mb-1 text-left">Matricula: {{ matricula }}</p>
          <p class="body-2 mb-1 text-left">Nome: {{ nome_solicitante }}</p>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto mb-2" max-width="580">
        <v-card-text>
          <p class="title sm-1 mb-1 text-left">Equipamento</p>
          <v-text-field v-model="id_patrimonio" label="Nº Patrimônio" outlined></v-text-field>
          <p class="body-2 mb-1 text-left">Nome: </p>
          <p class="body-2 mb-1 text-left">Nome: </p>
        </v-card-text>
      </v-card>

    </v-card>
  </v-dialog>
</template>

<script>
import Util from "@/plugins/Util";

export default {
  name: "CriarChamadoDialog",
  props: {
    value: Boolean,
    infonovochamado : Object
  },
  data: () =>({
    matricula: '',
    nome_solicitante: '',
    id_patrimonio:''
  }),

  async created() {
      this.matricula = (Util.getInfoUsuario().id);
      this.nome_solicitante = (Util.getInfoUsuario().nome);
    },

  computed: {
    dialogCriarChamado: {
      get() {
        console.log(this.novochamado);
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>