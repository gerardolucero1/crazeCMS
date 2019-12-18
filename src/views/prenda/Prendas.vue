<style lang="">
    
</style>

<template>
    <v-layout>
        <v-container grid-list-xs>
            <v-row>
                <v-col>
                    <v-img
                        class="white--text align-end"
                        width="100%"
                        :src="prenda.foto"
                        >
                        </v-img>
                </v-col>
                <v-col>
                   <v-card v-if="prenda.length != 0"
                        class="mx-auto"
                        max-width="400"
                    >
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
                        <template>
                            <v-dialog v-model="editarPrenda" persistent max-width="600px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" text v-on="on" @click="prendaEdicion = JSON.parse( JSON.stringify( prenda ) )">Editar</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="headline grey lighten-2" primary-title>
                                        <span class="headline">Prenda</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-text-field label="Nombre" required v-model="prendaEdicion.nombre"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-text-field label="Marca" required v-model="prendaEdicion.marca"></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-select
                                                    :items="categorias"
                                                    item-text="nombre"
                                                    item-value="id"
                                                    label="Categoria"
                                                    v-model="categoriaSeleccionada"
                                                    ></v-select>
                                                </v-col>
                                                <v-col v-if="categoriaSeleccionada != null">
                                                    <v-select
                                                        v-model="prendaEdicion.tallas"
                                                        :items="categoria.tallas"
                                                        label="Tallas"
                                                        multiple
                                                        chips
                                                    ></v-select>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-textarea label="Descripcion" required v-model="prendaEdicion.descripcion"></v-textarea>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <file-pond v-if="vista == 1"
                                                        label-idle="Selecciona una imagen" 
                                                        accepted-file-types="image/jpeg, image/png, image/jpg"
                                                        labelFileTypeNotAllowed="SOlo imagenes jpeg o png"
                                                        instant-upload="false"
                                                        @addfile="cargarImagen"
                                                        >
                                                    </file-pond>
                                                    <img v-if="vista == 2" ref="vistaPrevia" src="" alt="" width="100%">
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="editarPrenda = false, prendaEdicion = ''">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="primary" text @click="guardarPrenda">
                                            Guardar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </template>

                        <v-btn
                            color="red"
                            text
                        >
                            Eliminar
                        </v-btn>
                        </v-card-actions>
                    </v-card>              
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { db, storage } from '@/firebase'

import vueFilePond from 'vue-filepond'
import FilePondPluginValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'

import Cropper from 'cropperjs/dist/cropper'
import 'cropperjs/dist/cropper.css'

import uuidv4 from 'uuid/v4'

const FilePond = vueFilePond(FilePondPluginValidateType)

export default {
    data(){
        return{
            prenda: '',
            editarPrenda: false,
            prendaEdicion: '',

            vista: 1,

            categoriaSeleccionada: null,
            categoria: '',
            categorias: [],

            tallas: [],

            boutique: '',
        }
    },
    async mounted() {
        let id = this.$route.params.id

        await db.collection('prendas').doc(this.sesion.usuario.boutique).collection('ropa').doc(id).onSnapshot(response => {
            this.prenda = response.data()
            this.prendaEdicion = JSON.parse( JSON.stringify( this.prenda ) )

        })

        await db.collection('boutiques').doc(this.sesion.usuario.boutique).onSnapshot(response => {
            this.boutique = response.data()
        })

        await db.collection('categorias').onSnapshot(response => {
            this.categorias = [];
            response.forEach(doc => {
                this.categorias.push(doc.data())
            })
        })
        
    },
    computed: {
        ...mapState(['sesion'])
    },
    watch:{
        categoriaSeleccionada(){
            this.categoria = this.categorias.find(element => element.id == this.categoriaSeleccionada)
        }
    },
    methods: {
        async guardarPrenda(){
            let idPrenda = this.$route.params.id
            try {
                let response = await db.collection('prendas').doc(this.sesion.usuario.boutique).collection('ropa').doc(idPrenda).set(this.prendaEdicion, {merge: true})
                
                if(this.cropper){
                    let canvas = this.cropper.getCroppedCanvas()
                    let imagen = canvas.toDataURL('image/png')
                    let fotoId = uuidv4()

                    try {
                        let ref = storage.ref()
                        let resultado = await ref.child('boutiques/' + this.boutique.nombre + '/prendas/' + fotoId + '.png')
                                                .putString(imagen, 'data_url')
                        
                        let URL = await resultado.ref.getDownloadURL()

                        await db.collection('prendas').doc(this.sesion.usuario.boutique).collection('ropa').doc(idPrenda).update({ foto: URL })
                    } catch (e) {
                        console.log(e)
                    }
                }
                
                this.prendaEdicion = ''
                this.editarPrenda = false
            } catch (e) {
                console.log(e)
            }
        },

        cargarImagen(error, imagen){
            if(error){
                console.log(error)
                return
            }
            console.log(imagen.file)
            this.vista = 2

            let reader = new FileReader()

            let vm = this

            reader.onloadend= () => {
                vm.$refs.vistaPrevia.src = reader.result
                vm.recortarImagen()
            }

            if(imagen){
                if(imagen.file){
                    reader.readAsDataURL(imagen.file)
                }
            }
        },

        recortarImagen(){
            this.cropper = new Cropper(this.$refs.vistaPrevia, {
                preview: this.$refs.vistaPrevia,
                //aspectRatio: 1,
                modal: false,
                guides: true,
                sized: false,
                zoomable: false,
                highlight: true,
                background: false,
                autoCrop: true,
            })
        },
    },
}
</script>