<template>
    <v-layout wrap>
        <v-flex lg3>
            <div>
            <p>Likes totales: {{totalLikes}}</p>
            <v-data-table
                :headers="headers"
                :items="listaLikes"
                :items-per-page="5"
                class="elevation-1"
                loading="true"

            >
            </v-data-table>
            </div>
            <div>
            <p>Dislikes totales: {{totalDislikes}}</p>
            <v-data-table
                :headers="headers2"
                :items="listaDislikes"
                :items-per-page="5"
                class="elevation-1"
                loading="true"

            >
            </v-data-table>
            </div>
        </v-flex>
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
            totalLikes : 0,
            totalDislikes : 0,


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
        let boutiqueId = 'bzTPm28OeUu9NghDhJln'//this.sesion.user.boutique
        this.listaLikes = []
        this.listaDislikes = []
        this.totalLikes = 0
        this.totalDislikes = 0

        await db.collection('prendas').where('boutique','==',boutiqueId).get().then( snapshot =>{
            snapshot.forEach(doc=>{
                this.prendas.push(doc.data())
                if(doc.data().publicado){
                    this.publicadas.push(doc.data())
                }

                db.collectionGroup('like').where('id','==',doc.data().id).get().then( snapshot=>{
                    this.listaLikes.push({name: doc.data().name, likes: snapshot.size})
                })
                db.collectionGroup('dislike').where('id','==',doc.data().id).get().then( snapshot=>{
                    this.listaDislikes.push({name: doc.data().name, dislikes: snapshot.size})
                })
            })
        })
        for (let i = 0; i<this.listaLikes.length; i++){
          this.totalLikes+=this.listaLikes[i].likes;
        }
        for (let i = 0; i<this.listaDislikes.length; i++){
          this.totalDislikes+=this.listaDislikes[i].dislikes;
        }
    }
}
</script>

<style>

</style>
