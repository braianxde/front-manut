<template>
  <v-main>
    <v-data-table
      :headers="headers"
      :items="chamadoPorArea"
      sort-by="dataAbertura"
      class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Chamados da Area de {{ nomeArea }} </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn height="30" width="30" @click="detalheChamado(item)">
          <img src="../assets/detalhe.png"/>
        </v-btn>
        <v-btn height="30" width="30" @click="tratarChamado(item)">
          <img src="../assets/tratar.png"/>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
    <ChamadoDetalheDialog :infochamado="this.infoChamado" v-model="dialogExplorar"
                          v-if="dialogExplorar"></ChamadoDetalheDialog>
    <TratarChamadoDialog :infochamado="this.infoChamado" v-model="dialogTratarChamado"
                         v-if="dialogTratarChamado"></TratarChamadoDialog>
  </v-main>
</template>

<script>
import axios from "@/plugins/axios";
import ChamadoDetalheDialog from "@/components/ChamadoDetalheDialog";
import TratarChamadoDialog from "@/components/TratarChamadoDialog";
import Util from "@/plugins/Util";


export default {
  name: 'Tratar',
  components: {ChamadoDetalheDialog, TratarChamadoDialog},
  data:() => ({
    dialogExplorar: false,
    dialogTratarChamado: false,
    infoChamado: null,
    chamadoPorArea: [],
    areaChamado: '',
    tecnico: '',
    nomeArea: '',
    headers: [
      {text: 'ID', align: 'start', sortable: false, value: 'id'},
      {text: 'Assunto', value: 'assunto'},
      {text: 'Matrícula', value: 'idUsuario'},
      {text: 'Data Abertura', value: 'dataAbertura'},
      {text: 'Data Fechamento', value: 'dataFechamento'},
      {text: 'Técnico', value: 'tecnico'},
      {text: 'Actions', value: 'actions', sortable: false},
    ]
  }),
  mounted() { 
  },
  
  async created() {
    this.areaChamado = (Util.getInfoUsuario().idAreaTec);
    this.chamadoPorArea = await axios.get("chamadosPorAreaTecnica/" + this.areaChamado)
    this.nomeArea = (Util.getInfoUsuario().areaTecnica);
    this.tecnico = (Util.getInfoUsuario().idTecnico);
  },
  methods: {
    async detalheChamado(item) {
      let idChamado = item.id;
      let detalhe = await axios.get("chamadoCompleto/" + idChamado);
      this.infoChamado = detalhe[0];
      this.dialogExplorar = true
    },
    async tratarChamado (item){
      this.dialogTratarChamado = true
      let idChamado = item.id;
      let detalhe = await axios.get("chamadoCompleto/" + idChamado);
      this.infoChamado = detalhe[0];
      let objetoTrataChamado = {
        idTecnico: this.tecnico
      };
      const retornoCadastroChamado = await axios.post("chamado/" + idChamado, objetoTrataChamado);
      this.$toasted.success("Técnico inserido no Chamado!");
      console.log(retornoCadastroChamado)
    }
  }  
}

</script>

<style scoped>

</style>