<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card class="elevation-6">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>
                        Confirma tu direccion de correo electronico
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <span>
                        Te hemos enviado un correo de verificacion a la direccion especificada
                    </span>
                </v-card-text>
                <v-card-text>
                    <v-btn @click="reenviarEmail" color="success">Reenviar Email</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { auth } from '@/firebase'
import { mapMutations } from 'vuex'

export default {
    name: 'VerificacionEmail',
    data(){
        return{

        }
    },
    methods: {
        ...mapMutations([
            'mostrarExito',
            'mostrarError'
        ]),

        async reenviarEmail(){    
            try{
                auth.currentUser.sendEmailVerification()
                this.mostrarExito('Te hemos enviado un nuevo correo de verificacion')
                this.$router.push({ name: 'home' })
            }
            catch(error){
                this.mostrarError('Ocurrio un error enviando el email de verificacion')
            }
        }
    }
}
</script>

<style>

</style>