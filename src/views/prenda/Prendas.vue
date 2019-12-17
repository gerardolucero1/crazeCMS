<style lang="">
    
</style>

<template>
    <v-layout>
        <v-container grid-list-xs>
            <v-row>
                <v-col>
                   <v-card v-if="prenda.length != 0"
                        class="mx-auto"
                        max-width="400"
                    >
                        <v-img
                        class="white--text align-end"
                        height="200px"
                        :src="prenda.foto"
                        >
                        </v-img>

                        <v-card-title>{{ prenda.nombre }}</v-card-title>
                        <v-divider></v-divider>
                        <v-chip
                            v-for="(item, index) in prenda.tallas" :key="index"
                            class="ma-2"
                            color="primary"
                        >
                            {{ item }}
                        </v-chip>

                        <v-card-text class="text--primary">
                        <div>{{ prenda.descripcion }}</div>
                        </v-card-text>

                        <v-card-actions>
                        <v-btn
                            color="orange"
                            text
                        >
                            Share
                        </v-btn>

                        <v-btn
                            color="orange"
                            text
                        >
                            Explore
                        </v-btn>
                        </v-card-actions>
                    </v-card>              
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
import { db, storage } from '@/firebase'
import { mapState } from 'vuex'

export default {
    data(){
        return{
            prenda: '',
        }
    },
    async mounted() {
        let id = this.$route.params.id
        try {
            let response = await db.collection('prendas').doc(this.sesion.usuario.boutique).collection('ropa').doc(id).get()
            if(response.exists){
                this.prenda = response.data()
            }
        } catch (e) {
            console.log(e)
        }
        
    },
    computed: {
        ...mapState(['sesion'])
    },
}
</script>