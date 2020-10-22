<template>
  <v-card dark flat tile>
    <v-toolbar class="toolbar-navbarmenu">
      <img :src="imageUrl" height="26" id="logo" style="cursor:pointer; display:block" />
      <v-spacer></v-spacer>

      <v-toolbar-items id="botoes-menu">
        <v-menu class="navbar-button">
          <template v-slot:activator="{ on }">
            <v-btn
                text
                color="white"
                v-on="on"
                class="navbar-button"
            >menu 1</v-btn>
          </template>
        </v-menu>

        <v-menu class="navbar-button">
          <template v-slot:activator="{ on }">
            <v-btn
                text
                color="white"
                v-on="on"
                class="navbar-button"
            >menu 2</v-btn>
          </template>
        </v-menu>

        <v-menu class="navbar-button">
          <template v-slot:activator="{ on }">
            <v-btn
                color="white"
                text
                v-on="on"
                class="navbar-button"
                @click="navigateTo('MeusReembolsos')"
            >Menu 3</v-btn>
          </template>
        </v-menu>

      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
  </v-card>
</template>
<script>
import router from "../plugins/router";
export default {
  name: "Navbar",
  methods: {
    navigateTo: function(nameRoute) {
      router.push(nameRoute);
    }
  }
};
</script>

<style scoped>
#logo {
  display: none !important;
}

.container-navbar {
  text-align: end;
  float: right;
  padding-right: 0px;
  margin-left: 0;
}
#menu-button {
  display: none;
}
#botoes-menu {
  display: block;
}
#btn-menu-drawer {
  display: none;
}

.mostrarLogo {
  display: block;
}

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
  .btn-store {
    font-size: 11px !important;
    padding: 7px !important;
  }

  .btn-store icon {
    font-size: 12px;
  }

  .navbar-button {
    font-size: 11px !important;
    padding: 0;
    margin: 0;
    min-width: 48px;
  }
}

@media (max-width: 729px) {
  #menu-button {
    display: block;
  }

  #btn-menu-drawer {
    display: block;
  }

  #botoes-menu {
    display: none;
  }

  #logo {
    display: block !important;
  }
}
</style>
