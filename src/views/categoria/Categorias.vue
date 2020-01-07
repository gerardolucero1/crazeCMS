<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm12 md10 lg10 x0>
            <v-card>
                <v-card-title>
                    Categorias -
                    <v-row justify="center">
                        <v-dialog v-model="modalCategoria" persistent max-width="600px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on">Agregar categoria</v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="headline grey lighten-2" primary-title>
                                    <span class="headline">Categorias</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field label="Nombre" required v-model="categoria"></v-text-field>
                                            </v-col>
                                            <v-col cols="8" md="8">
                                                <v-text-field label="Tallas" required v-model="talla"></v-text-field>
                                            </v-col>
                                            <v-col cols="4" md="4">
                                                <v-btn color="success" @click="agregarTalla">Agregar</v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md12>
                                                <v-simple-table dense>
                                                    <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Nombre</th>
                                                            <th class="text-center">Opciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) in tallas" :key="index">
                                                            <td>{{ index }}</td>
                                                            <td>{{ item }}</td>
                                                            <td class="text-center">
                                                                <v-btn text icon color="pink" @click="eliminarTalla(index)">
                                                                    <v-icon>delete</v-icon>
                                                                </v-btn>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="modalCategoria = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="primary" text @click="guardarCategoria">
                                        Guardar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-row>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="categorias"
                    :items-per-page="5"
                    class="elevation-1"
                    loading="true"
                    :search="search"
                >

                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { db } from '@/firebase'

export default {
    data(){
        return{
            modalCategoria: false,
            //Tallas
            talla: '',
            tallas: [],

            search: '',
            headers: [
                {
                    text: 'Nombre',
                    align: 'left',
                    sortable: false,
                    value: 'nombre',
                },
                { text: 'Boutiques', value: 'boutiques' },
                { text: 'Prendas', value: 'prendas' },
                { text: 'Opciones', value: 'opciones' },
            ],
            categorias: [],
            categoria: '',
        }
    },
    mounted(){
        db.collection('categorias').onSnapshot(response => {
            this.categorias = [];
            response.forEach(doc => {
                this.categorias.push(doc.data())
            })
        })
    },
    methods: {
        agregarTalla(){
            this.tallas.push(this.talla)
            this.talla = ''
        },

        eliminarTalla(index){
            this.tallas.splice(index, 1)
        },

        async guardarCategoria(){
            try{
                let response = await db.collection('categorias').add({nombre: this.categoria})
                let addId = await db.collection('categorias').doc(response.id).update({ id: response.id })
                let addTallas = await db.collection('categorias').doc(response.id).update({ tallas: this.tallas })
            }
            catch(e){
                console.log(e)
            }
            finally{
                this.modalCategoria = false
            }
        }
    }
}
</script>

<style>

</style>
