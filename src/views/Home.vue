<style lang="">

</style>

<template>
    <v-layout>
        <v-container grid-list-xs>
            <v-row>
                <v-col>
                    <v-card
                    class="mx-auto"
                    max-width="400"
                    >
                        <v-card-title>Total de prendas subidas</v-card-title>

                        <v-card-text class="headline text-center font-weight-bold">
                          3
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                    class="mx-auto"
                    max-width="400"
                    >
                        <v-card-title>Total de vistas</v-card-title>

                        <v-card-text class="headline text-center font-weight-bold">
                          30
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                    class="mx-auto"
                    max-width="400"
                    >
                        <v-card-title>Likes esta semana</v-card-title>

                        <v-card-text class="headline text-center font-weight-bold">
                          13
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                    class="mx-auto"
                    max-width="400"
                    >
                        <v-card-title>Dislikes esta semana</v-card-title>

                        <v-card-text class="headline text-center font-weight-bold">
                          17
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                    class="mx-auto"
                    max-width="400"
                    >
                        <v-img
                          class="white--text align-end"
                          height="200px"
                          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        >
                          <v-card-title>Prenda con mas likes esta semana</v-card-title>
                        </v-img>

                        <v-card-text class="headline text-center font-weight-bold">
                          TOPSHOP SWEATER
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                    class="mx-auto"
                    max-width="400"
                    >
                        <v-img
                          class="white--text align-end"
                          height="200px"
                          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        >
                          <v-card-title>Prenda con mas dislikes esta semana</v-card-title>
                        </v-img>

                        <v-card-text class="headline text-center font-weight-bold">
                          Express sequin slip dress
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                    class="mx-auto"
                    max-width="400"
                    >
                        <v-card-title class="justify-center">% de cambio en likes</v-card-title>
                        <v-card-title class="justify-center">respecto a la semana pasada</v-card-title>
                        <v-card-text class="headline text-center font-weight-bold">
                          56%
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                    class="mx-auto"
                    max-width="400"
                    >
                        <v-card-title class="justify-center">% de cambio en dislikes</v-card-title>
                        <v-card-title class="justify-center">respecto a la semana pasada</v-card-title>
                        <v-card-text class="headline text-center font-weight-bold">
                          56%
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { db, storage } from '@/firebase'

export default {
    data(){
        return{
            prendas : [],
            publicadas : [],
            listaLikes : [],
            listaDislikes : [],
            totalLikes : 13,
            totalDislikes : 17,


            headers: [
                {
                    text: 'Nombre',
                    align: 'left',
                    sortable: false,
                    value: 'nombre',
                },
                {
                    text: 'Likes',
                    value: 'likes'
                }
            ],

            headers2: [
                {
                    text: 'Nombre',
                    align: 'left',
                    sortable: false,
                    value: 'nombre',
                },
                {
                    text: 'Dislikes',
                    value: 'dislikes'
                }
            ],
        }
    },
    computed: {
        ...mapState(['sesion'])
    },
    async mounted() {
    this.prendas = [{name: Sueter, likes: 3, dislikes: 2},{name: Pantalon, likes: 10, dislikes: 5}, {name: Camisa, likes: 0, dislikes: 10}];
    this.publicadas = [{name: Sueter, likes: 3, dislikes: 2},{name: Pantalon, likes: 10, dislikes: 5}];
//        let boutiqueId = 'bzTPm28OeUu9NghDhJln'//this.sesion.user.boutique
//        this.listaLikes = []
//        this.listaDislikes = []
//        this.totalLikes = 0
//        this.totalDislikes = 0
//
//        await db.collection('prendas').where('boutique','==',boutiqueId).get().then( snapshot =>{
//            snapshot.forEach(doc=>{
//                this.prendas.push(doc.data())
//                if(doc.data().publicado){
//                    this.publicadas.push(doc.data())
//                }
//
//                db.collectionGroup('like').where('id','==',doc.data().id).get().then( snapshot=>{
//                    this.listaLikes.push({name: doc.data().name, likes: snapshot.size})
//                })
//                db.collectionGroup('dislike').where('id','==',doc.data().id).get().then( snapshot=>{
//                    this.listaDislikes.push({name: doc.data().name, dislikes: snapshot.size})
//                })
//            })
//        })
//        for (let i = 0; i<this.listaLikes.length; i++){
//          this.totalLikes+=this.listaLikes[i].likes;
//        }
//        for (let i = 0; i<this.listaDislikes.length; i++){
//          this.totalDislikes+=this.listaDislikes[i].dislikes;
//        }
    }
}
</script>

<style>

</style>
