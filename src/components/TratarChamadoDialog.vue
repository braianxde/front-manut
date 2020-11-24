<template>
  <v-dialog v-model="dialogTratarChamado" max-width="600px"> 
    <v-card class="px-2 pt-2" >
      <v-card-title class="blue White--text">
        <span class="headline mb-1">Tratamento Chamado nº {{this.infochamado.id}}</span>
      </v-card-title>
      <v-card class="mx-auto mb-2" max-width="580">
        <v-card-text class="body-2 text-left">
          <p class="mb-1">Data de abertura: {{this.infochamado.dataAbertura}}</p>
          <p class="mb-1">Solicitante: {{this.infochamado.solicitante}}</p>
          <p class="mb-1">Assunto: {{this.infochamado.assunto}}</p>
          <p class="mb-3">Texto: {{this.infochamado.texto}} </p>
          <v-row>
            <v-col cols="8">
              <p>Area Técnica atual: {{this.infochamado.areaTecnica}} </p>
            </v-col>
            <v-col cols="4">
              <v-switch  class="mt-n2" v-model="alteraAreaTec" hide-details color="success" label="alterar"></v-switch> 
            </v-col>
          </v-row>
          <v-select v-if="alteraAreaTec" class="mt-n4" v-model="areaTecnicaSelecionada" :items="areaTecnica"></v-select>
          <v-row>
            <v-col cols="8">
              <p class="mb-1">Nº Patrimônio: {{this.infochamado.idEquipamento}}</p>
              <p class="mb-1">Equipamento: {{this.infochamado.nome_equipamento}}</p>
            </v-col>
            <v-col cols="4">
              <v-switch v-model="alteraEquipamento" hide-details color="success" label="alterar"></v-switch> 
            </v-col>
          </v-row>
          <v-row v-if="alteraEquipamento">
            <v-col cols="8">
              <v-text-field input v-model="id_patrimonio" label="Nº Patrimônio" outlined></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn color="green darken-1" text @click="pesquisaEquipamento()">Buscar</v-btn>
            </v-col>
          </v-row>
          <div v-if="mostraDados">
            <p class="body-2 mb-1 mt-n4 text-left">Nome: {{this.equipSelecionado.nome}} </p>
            <p class="body-2 mb-1 text-left">Descrição: {{this.equipSelecionado.descricao}} </p>
          </div>
          <v-switch v-if="encerramentoChamado" v-model="alteraStatus" hide-details color="primary" label="ENCERRAR CHAMADO"></v-switch> 
            <h2 v-if="imprimeEncerrado" class="red--text">Chamado Encerrado!</h2>
          <v-card v-if="alteraStatus" max-width="300">
            <p class="body-2 text-center">Confirma Encerramento do Chamado?</p>
            <v-row align="center" justify="space-around" class="pb-2 mt-n2">
              <v-btn x-small color="primary" dark @click="encerraChamado()"> Sim </v-btn>
              <v-btn x-small color="error" dark @click="volta()"> Não </v-btn>
            </v-row>
          </v-card>
          <v-switch v-model="insertComentario" hide-details color="primary" label="Inserir Comentário"></v-switch> 
          <v-card class="mx-auto mb-auto mt-4" v-if="insertComentario" max-width="560">
            <v-textarea label="Comentário" v-model="comentario" class="mx-4 mt-n4" auto-grow outlined rows="4" row-height="30"></v-textarea>
          </v-card>
        </v-card-text>
      </v-card>
      <div class="py-4">
        <v-btn class="mr-4" @click="submit">Salvar</v-btn>
        <v-btn @click="clear">Cancelar</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "TratarChamadoDialog",
  props: {
    value: Boolean,
    infochamado: Object
  },
  data: () =>({
    alteraAreaTec: false,
    alteraEquipamento: false,
    alteraStatus: false,
    encerramentoChamado: false,
    imprimeEncerrado: false,
    insertComentario: false,
    areaTecnica: [],
    id_patrimonio:'',
    areaTecnicaSelecionada: null,
    equipSelecionado: null,
    mostraDados: false,
    idAreaTec: '',
    idChamado: '',
    status:'',
    comentario: ''
  }),

  async created() {
      let areaTec = await axios.get("areaTec");
      this.areaTecnica = areaTec;
      this.encerramentoChamado = true
      this.idChamado = this.infochamado.id
    },

  computed: {
    dialogTratarChamado: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    async pesquisaEquipamento() {
      let equip = await axios.get("equipamentoId/" + this.id_patrimonio);
      this.equipSelecionado = equip[0];
      this.mostraDados = true
    },
    clear (){
      this.dialogTratarChamado = false
    },
    encerraChamado(){
      this.alteraStatus = false
      this.status = 2
      this.encerramentoChamado = false
      this.imprimeEncerrado = true
    },
    volta() {
      this.alteraStatus = false
    },
    async submit () {
      if (this.alteraAreaTec == true) {
        this.idAreaTec = this.areaTecnicaSelecionada
      }
      let objetoAlterarChamado = {
        idAreaTec: this.idAreaTec,
        idEquipamento: this.id_patrimonio,
        staus: this.status
      };
      const retornoAlteraChamado = await axios.post("chamado/"+ this.idChamado, objetoAlterarChamado);
      this.$toasted.success("Alterado com sucesso");
      console.log(retornoAlteraChamado)

      if (this.insertComentario == true) {
        let objetoComentario = {
          idChamado: this.idChamado,
          texto: this.comentario
        };
        const retornoComentario = await axios.post("comentario", objetoComentario);
        this.$toasted.success("Inserido Comentário");
        console.log(retornoComentario)
      }
      this.clear ();
    }
  }
}
</script>
<style scoped>

</style>