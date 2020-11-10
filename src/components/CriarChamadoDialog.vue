<template>
    <v-dialog v-model="dialogCriarChamado" max-width="500px"> 
        <v-card>
            <span>Teste</span>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: "CriarChamadoDialog",
    props: {
        value: Boolean,
        infonovochamado : Object
    },
    data: () =>({}),

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

    }
}
</script>

<style scoped>

</style>