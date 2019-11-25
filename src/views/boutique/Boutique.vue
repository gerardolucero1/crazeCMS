<template>
    <v-layout v-if="boutique != null" justify-center text-center>
        <v-flex xs12 sm6 md4 lg3>
            <div>
                <h1 class="boutique-nombre">{{ boutique.nombre }}</h1>
            </div>
            <v-card class="elevation-2 ma-3">
                <v-img :src="boutique.logo">

                </v-img>
            </v-card>
            <v-btn color="success" v-for="(item, index) in boutique.categorias" :key="index">
                {{ item.nombre }}
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '@/firebase'

export default {
    data(){
        return{
            load: false,
            boutique: null
        }
    },
    computed: {

    },
    async mounted(){
        let id = this.$route.params.id
        let response = await db.collection('boutiques').doc(id).get()

        if(response.exists){
            this.boutique = response.data()  
        }
    },
    created(){

    }
}
</script>

<style>
    .boutique-nombre{
        font-size: 1.5rem;
        color: red;
    }
</style>