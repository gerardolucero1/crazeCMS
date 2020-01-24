<template>
    <v-layout text-sm-center align-start justify-center>
        <v-card class="elevation-6">
            <v-card-text>
                <caja
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
  
}
</script>

<style>
    .foto-perfil{
        width: 200px;
        height: 100%;
    }
</style>
