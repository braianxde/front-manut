<template>
  <v-main>
    <v-row justify="center" align-content="center" no-gutters>
      <v-col cols="10" md="4" sm="6">
        <v-container class="container-login" style="margin-top:0px;">
          <v-row>
            <v-col cols="12">
              <img src="../assets/manut.png" height="282" width="301"/>
            </v-col>
          </v-row>

          <v-form ref="form" v-model="isValidForm">
            <v-text-field
                v-model="credentials.email"
                outlined
                placeholder="Email"
                style="margin-top:10px;"
                v-on:keyup.enter="authenticate"
            ></v-text-field>

            <v-text-field
                v-model="credentials.senha"
                outlined
                placeholder="Senha"
                type="password"
                v-on:keyup.enter="authenticate"
            ></v-text-field>
                <v-btn
                    @click="authenticate"
                    :loading="isLoading"
                    :disabled="!isValidForm"
                    block
                    x-large
                    color="success"
                    dark
                >Logar</v-btn>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: 'Login',
  data: () => ({
    credentials: {},
    isLoading: false,
    isValidForm: false
  }),
  async mounted() {
  },
  methods: {
    async authenticate() {
      var ref = this;

      if (this.$refs.form.validate()) {
        ref.isLoading = true;

        const authUser = await axios.post("login", this.credentials);
        if (authUser.success) {
          this.$toasted.success("Logado com sucesso");
          localStorage.setItem("TOKENMANUT", authUser.data);
          await this.$router.push("Home");
        } else {
          this.isLoading = false;
        }
      }
    }
  }
};
</script>

<style scoped>

</style>