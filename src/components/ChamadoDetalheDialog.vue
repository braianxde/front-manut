<template>
  <!-- Dialog Explorar Chamado -->
  <v-dialog v-model="dialogExplorar" max-width="500px">
    <v-card>
      <v-card-title class="cyan White--text">
        <span class="headline">Chamado nº {{ this.infochamado.id }} </span>
      </v-card-title>
      <v-card-text>
        <v-card>
          <v-card-text class="body-2 my-2 text-left">
            <p class="mb-1">Solicitante: {{this.infochamado.solicitante}}</p>
            <p class="mb-1">Matricula: {{this.infochamado.idUsuario}}</p>
            <p class="mb-n2">Centro de Custo: {{this.infochamado.centro_custo}} </p>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text class="body-2 my-2 text-left">
            <p class="mb-1">Nº Patrimônio: {{this.infochamado.idEquipamento}}</p>
            <p class="mb-1">Equipamento: {{this.infochamado.nome_equipamento}}</p>
            <p class="mb-n2">Descrição: {{this.infochamado.des_equipamento}} </p>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text class="body-2 my-2 text-left">
            <p class="mb-1">Data de abertura: {{this.infochamado.dataAbertura}}</p>
            <p class="mb-1">Status: {{this.infochamado.id ? getStatus(this.infochamado.status) : ""}}</p>
            <p class="mb-1">Area Técnica: {{this.infochamado.areaTecnica}}</p>
            <p class="mb-n2">Técnico Responsável: {{this.infochamado.tecnico}} </p>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text class="body-2 my-2 text-left">
            <p class="mb-1">Assunto: {{this.infochamado.assunto}}</p>
            <p class="mb-n2">Texto: {{this.infochamado.texto}} </p>
          </v-card-text>
        </v-card>
        <v-card v-if="temComentario">
          <p class="body-2 pt-2 font-weight-bold">Comentários</p>
          <v-card-text v-for="item in comentarios" :key="item.id" class="body-2 mt-n3 text-left">
            <p class="mb-1">Data: {{item.dataComentario}}</p>
            <p class="mb-n2">Comentário: {{item.texto}}</p>
          </v-card-text>
      </v-card>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialogExplorar = false">
          Fechar
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
    comentarios: [],
    temComentario: true
  }),

  async mounted() {
  },

  async created(){
    let idChamado = this.infochamado.id;
    this.comentarios = await axios.get("comentarioPorChamado/" + idChamado)
    if (this.comentarios == []){
      this.temComentario = false
    }
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
  }
}
</script>

<style scoped>

</style>