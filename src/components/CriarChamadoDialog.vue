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
          <v-row>
            <v-col cols="9">
              <v-text-field input v-model="id_patrimonio" label="Nº Patrimônio" outlined></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-btn color="green darken-1" text @click="pesquisaEquipamento()">Buscar</v-btn>
            </v-col>
          </v-row>
          <div v-if="mostraDados">
            <p class="body-2 mb-1 mt-n4 text-left">Nome: {{this.equipSelecionado.nome}} </p>
            <p class="body-2 mb-1 text-left">Descrição: {{this.equipSelecionado.descricao}} </p>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto mb-2" max-width="580">
        <v-card-text>
          <p class="title sm-1 mb-1 text-left">Área Técnica</p>
        <v-select class="mt-n2 text-left" v-model="areaTecnicaSelecionada" :items="areaTecnica"></v-select>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto mb-auto mt-4" max-width="580">
        <v-textarea label="Assunto" v-model="assunto" class="mx-4 mt-4" auto-grow outlined rows="1" row-height="15"></v-textarea>
        <v-textarea label="Texto" v-model="texto" class="mx-4 mt-n4" auto-grow outlined rows="4" row-height="30"></v-textarea>
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
    value: Boolean
  },
  data: () =>({
    matricula: '',
    nome_solicitante: '',
    id_patrimonio:'',
    equipSelecionado: null,
    areaTecnica: [],
    areaTecnicaSelecionada: null,
    confPatrimonio: false,
    assunto: '',
    texto: '',
    mostraDados: false
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
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods:{
    async pesquisaEquipamento() {
      let equip = await axios.get("equipamentoId/" + this.id_patrimonio);
      this.equipSelecionado = equip[0];
      this.mostraDados = true
    },
    async submit() {
      let objetoEnviaChamado = {
        idEquipamento: this.id_patrimonio,
        idUsuario: this.matricula,
        idAreaTec: this.areaTecnicaSelecionada,
        assunto: this.assunto,
        texto: this.texto
      };

      const retornoCadastroChamado = await axios.post("chamado", objetoEnviaChamado);
      this.$toasted.success("Cadastrado com sucesso");
      this.clear();
      console.log(retornoCadastroChamado)
    },
    clear (){
      this.dialogCriarChamado = false
    }
  }
}
</script>

<style scoped>

</style>