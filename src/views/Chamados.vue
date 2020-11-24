<template>
  <v-main>
    <v-data-table
        :headers="headers"
        :items="chamados"
        sort-by="dataAbertura"
        class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-btn height="48" width="44" @click="abreNovoChamadoDialog()">
            <img src="../assets/addChamado.png"/>
          </v-btn>
          <v-toolbar-title class="ms-6">Meus Chamados</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn height="30" width="30" @click="detalheChamado(item)">
          <img src="../assets/detalhe.png"/>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn
            color="primary"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <ChamadoDetalheDialog :infochamado="this.infoChamado" v-model="dialogExplorar"
                          v-if="dialogExplorar"></ChamadoDetalheDialog>
    <CriarChamadoDialog v-model="dialogCriarChamado" v-if="dialogCriarChamado"></CriarChamadoDialog>
  </v-main>
</template>

<script>
import axios from "@/plugins/axios";
import ChamadoDetalheDialog from "@/components/ChamadoDetalheDialog";
import CriarChamadoDialog from "@/components/CriarChamadoDialog";
import Util from "@/plugins/Util";

export default {
  name: "Chamados",
  components: {ChamadoDetalheDialog, CriarChamadoDialog},
  data: () => ({
    dialogExplorar: false,
    dialogCriarChamado: false,
    infoChamado: null,
    novoChamado: null,
    chamados: [],
    headers: [
      {text: 'ID', align: 'start', sortable: false, value: 'id'},
      {text: 'Assunto', value: 'assunto'},
      {text: 'Matrícula', value: 'idUsuario'},
      {text: 'Data Abertura', value: 'dataAbertura'},
      {text: 'Data Fechamento', value: 'dataFechamento'},
      {text: 'Actions', value: 'actions', sortable: false},
    ]
  }),
  async created() {
    console.log(Util.getInfoUsuario().idAreaTec);
    this.chamados = await axios.get("chamado");
  },
  methods: {
    async detalheChamado(item) {
      let idChamado = item.id;
      let detalhe = await axios.get("chamadoCompleto/" + idChamado);
      this.infoChamado = detalhe[0];
      this.dialogExplorar = true
    },
    abreNovoChamadoDialog() {
      this.dialogCriarChamado = true
    }
  }
}
</script>

<style scoped>

</style>