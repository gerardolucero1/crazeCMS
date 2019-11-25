<template>
    <v-layout justify-center text-center>
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
export default {
    data(){
        return{
            load: false,
            boutique: null
        }
    },
    computed: {
        ...mapState(
            'boutique', ['boutiques']
        )
    },
    created(){
        let id = this.$route.params.id

        this.boutique = this.boutiques.find((element) => {
            return element.id == id
        })

        if(!this.boutique){
            //404
        }
    }
}
</script>

<style>
    .boutique-nombre{
        font-size: 1.5rem;
        color: red;
    }
</style>