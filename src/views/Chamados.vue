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
          <v-toolbar-title>Chamados</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          delete
        </v-icon>
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
    chamados: [],
    headers: [
      {
        text: 'Assunto',
        align: 'start',
        sortable: false,
        value: 'assunto',
      },
      { text: 'Data Abertura', value: 'dataAbertura' },
      { text: 'Data Fechamento', value: 'dataFechamento' },
      { text: 'Actions', value: 'actions', sortable: false },
    ]
  }),
  async created () {
    this.chamados = await axios.get("chamado");
  },
  methods: {
    editItem (item) {
      console.log(item);
    },
    deleteItem (item) {
      console.log(item);
    },
  },
}
</script>

<style scoped>

</style>