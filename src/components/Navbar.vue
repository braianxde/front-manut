<template>
  <v-card dark flat tile>
    <v-toolbar class="toolbar-navbarmenu">
      <v-spacer></v-spacer>

      <v-toolbar-items id="botoes-menu">
        <v-menu class="navbar-button">
          <template v-slot:activator="{ on }">
            <v-btn
                @click="navigateTo('Home')"
                text
                color="white"
                v-on="on"
                class="navbar-button"
            >Home
            </v-btn>
          </template>
        </v-menu>

        <v-menu class="navbar-button">
          <template v-slot:activator="{ on }">
            <v-btn
                @click="navigateTo('Chamados')"
                text
                color="white"
                v-on="on"
                class="navbar-button"
            >Chamados
            </v-btn>
          </template>
        </v-menu>

        <v-menu class="navbar-button" v-if="tipoUsuario == 2">
          <template v-slot:activator="{ on }">
            <v-btn
                @click="navigateTo('Tratar')"
                text
                color="white"
                v-on="on"
                class="navbar-button"
            >Tratar
            </v-btn>
          </template>
        </v-menu>

        <v-menu class="navbar-button">
          <template v-slot:activator="{ on }">
            <v-btn
                color="white"
                text
                v-on="on"
                class="navbar-button"
                @click="logout()"
            >LOGOUT
            </v-btn>
          </template>
        </v-menu>

      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
  </v-card>
</template>
<script>
import router from "../plugins/router";
import Util from "@/plugins/Util";

export default {
  name: "Navbar",
  data: () =>({
    tipoUsuario: 0
  }),
  created() {
      this.tipoUsuario = Util.getInfoUsuario().tipo;
  },
  methods: {
    navigateTo: function (nameRoute) {
      router.push(nameRoute);
    },
    logout: function () {
      localStorage.removeItem("USUARIOMANUT");
      this.navigateTo('/')
    }
  }
};
</script>

<style scoped>
.navbar-button {
  font-size: 14px !important;
}

@media (max-width: 950px) {
  .navbar-button {
    font-size: 13px !important;
    padding: 0;
  }
}

@media (max-width: 850px) {
  .navbar-button {
    font-size: 11px !important;
    padding: 0;
    margin: 0;
    min-width: 48px;
  }
}
</style>
