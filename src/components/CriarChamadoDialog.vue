<template>
  <v-dialog v-model="dialogCriarChamado" max-width="600px"> 
    <v-card class="px-4" >
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
      <div class="py-1">
        <v-switch v-model="confPatrimonio" hide-details color="success" label="Possui nº de patrimônio"></v-switch>
      </div>
      <v-card v-if="confPatrimonio" class="mx-auto mb-2" max-width="580">
        <v-card-text>
          <p class="title sm-1 mb-1 text-left">Equipamento</p>
          <v-btn class="mr8" fab dark small right absolute color="red" @click="pesquisaEquipamento()">
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
          <v-text-field input v-model="id_patrimonio" label="Nº Patrimônio" outlined></v-text-field>
          <p class="body-2 mb-1 mt-n4 text-left">Nome: </p>
          <p class="body-2 mb-1 text-left">Descrição: </p>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto mb-2" max-width="580">
        <v-card-text>
          <p class="title sm-1 mb-1 text-left">Área Técnica</p>
          <input type="text" v-model="descricao">
        <v-select class="mt-n8 text-left" v-model="areaTecnicaSelecionada" :items="areaTecnica"></v-select>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto mb-auto mt-4" max-width="580">
        <v-textarea label="Assunto" class="mx-4 mt-4" auto-grow outlined rows="1" row-height="15"></v-textarea>
        <v-textarea label="Texto" class="mx-4 mt-n4" auto-grow outlined rows="4" row-height="30"></v-textarea>
      </v-card>
      <div class="py-4">
        <v-btn class="mr-4" @click="submit">Salvar</v-btn>
        <v-btn @click="clear">Sair</v-btn>
      </div>

    </v-card>
  </v-dialog>
</template>

<script>
import Util from "@/plugins/Util";
import axios from "@/plugins/axios";

export default {
  name: "CriarChamadoDialog",
  props: {
    value: Boolean,
    infonovochamado : Object
  },
  data: () =>({
    matricula: '',
    nome_solicitante: '',
    id_patrimonio:'',
    equipSelecionado: null,
    areaTecnica: [],
    areaTecnicaSelecionada: null,
    confPatrimonio: false
  }),

  async created() {
      this.matricula = (Util.getInfoUsuario().id);
      this.nome_solicitante = (Util.getInfoUsuario().nome);
      let areaTec = await axios.get("areaTec");
      this.areaTecnica = areaTec;
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
    async pesquisaEquipamento(id_patrimonio) {
      let idEquipamento = id_patrimonio;
      let equip = await axios.get("equipamentoId/" + idEquipamento);
      this.equipSelecionado = equip[0];
      console.log(this.equipSelecionado);
    }
  }
}
</script>

<style scoped>

</style>