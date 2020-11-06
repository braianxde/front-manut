<template>
  <!-- Dialog Explorar Chamado -->
  <v-dialog v-model="dialogExplorar" max-width="500px">
    <v-card>
      <v-card-title class="cyan White--text">
        <span class="headline">Chamado nº -- </span>
      </v-card-title>
      <v-card-text>
        <div>
          <span>Solicitante: {{this.infochamado.id ? getStatus(this.infochamado.id) : ""}}</span>
          <span>Matricula: 36515</span>
        </div>
        <input type="text" v-model="descricao">
        <v-select v-model="areaTecnicaSelecionada" :items="areaTecnica"></v-select>
        <hr>
        <div>
          <span>Equipamento: nome equipamento</span>
          <span>Descrição: ...descrição...</span>
          <span>Nº Patrimônio: 123456</span>
        </div>
        <hr>
        <div>
          <span>Data de Abertura: 22/55/11</span>
          <span>Status: Ativo </span>
          <span>Area Técnica: TI</span>
          <span>Técnico Responsável: Braian</span>
        </div>
        <hr>
        <div>
          <span>Assunto: gggggggggggg</span>
          <span>Texto: pppppppppppppppppp</span>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialogExplorar = false">
          Fechar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="cadastrarChamado">
          Salvar
        </v-btn>
      </v-card-actions>


    </v-card>
  </v-dialog>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "ChamadoDetalheDialog",
  props: {
    value: Boolean,
    infochamado : Object
  },
  data: () => ({
    descricao: "",
    areaTecnica: [],
    areaTecnicaSelecionada: null
  }),
  async mounted() {
    let areaTec = await axios.get("areaTec");
    this.areaTecnica = areaTec;
  },
  computed: {
    dialogExplorar: {
      get() {
        console.log(this.infochamado);
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods:{
    getStatus(status){
      if(status == 1){
        return "Aberto"
      }else{
        return "Encerrado"
      }
    },
    cadastrarChamado(){
      console.log(this.areaTecnicaSelecionada)
      console.log(this.descricao);
    }
  }
}
</script>

<style scoped>

</style>