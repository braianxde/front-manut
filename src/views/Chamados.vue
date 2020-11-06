<template>
  <v-main>
    <v-data-table
        :headers="headers"
        :items="chamados"
        sort-by="dataAbertura"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>Meus Chamados</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <!-- Dialog Explorar Chamado -->
          <v-dialog v-model="dialogExplorar" max-width="500px">
            <v-card>
              <v-card-title class="cyan White--text">
                <span class="headline">Chamado nº -- </span>
              </v-card-title>
              <v-card-text>
                <div>
                  <span>Solicitante: Marcio Becker</span>
                  <span>Matricula: 36515</span>
                </div>
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
              </v-card-actions>
              

            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn class="mr8" fab dark small color="cyan" @click="explorar(item)">
          <v-icon dark>mdi-pencil</v-icon>
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
  </v-main>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Chamados",
  data: () => ({
    dialogExplorar: false,
    chamados: [],
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Assunto', value: 'assunto' },
      { text: 'Matrícula', value: 'idUsuario' },
      { text: 'Data Abertura', value: 'dataAbertura' },
      { text: 'Data Fechamento', value: 'dataFechamento' },
      { text: 'Actions', value: 'actions', sortable: false },
    ]
  }),
  async created () {
    this.chamados = await axios.get("chamado");
  },
  methods: {
    explorar () {
      this.dialogExplorar = true
    },
  },
}
</script>

<style scoped>

</style>