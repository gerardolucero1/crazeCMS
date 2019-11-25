<template>
    <v-layout text-sm-center align-start justify-center>
        <v-card class="elevation-6">
            <v-card-text>
                <div class="ma-2">
                    {{ usuario.nombres }} {{ usuario.apellidos }}
                </div>
                <v-img class="ma-2 foto-perfil" :src="usuario.fotoPerfil" alt=""></v-img>
                <div class="ma-2">
                    {{ usuario.descripcion }}
                </div>
                <a :href="usuario.biografia" target="_blank" class="ma-2 link">Biografia</a>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'

export default {
    name: 'Profile',
    computed: {
        ...mapState(
            'sesion', ['usuario']
        )
    },
    // beforeRouteEnter (to, from, next) {
    //     if(store.state.sesion.usuario){
    //         next()
    //     }else{
    //         next({ name: 'login' })
    //     }
    // }
}
</script>

<style>
    .foto-perfil{
        width: 200px;
        height: 100%;
    }
</style>