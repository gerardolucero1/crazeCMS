<template>
    <v-layout v-if="boutique != null" justify-center text-center>
        <v-container>
            <v-row>
                <v-col>
                    <v-flex>
                        <v-dialog v-model="modalBoutique" persistent max-width="600px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on">Editar Perfil Boutique</v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="headline grey lighten-2" primary-title>
                                    <span class="headline">Editar</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field label="Nombre" required v-model="newBoutique.nombre"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-text-field label="Telefono" required v-model="newBoutique.telefono"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-text-field label="Direccion" required v-model="newBoutique.direccion"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <file-pond v-if="vista == 1"
                                                    label-idle="Selecciona una imagen"
                                                    accepted-file-types="image/jpeg, image/png, image/jpg"
                                                    labelFileTypeNotAllowed="Solo imagenes jpeg o png"
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
                                    <v-btn color="primary" text @click="modalBoutique = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="primary" text @click="guardarBoutique">
                                        Guardar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-card class="elevation-2 ma-3">
                            <v-img :src="boutique.logo" min-height= "300px" max-height= "600px">

                            </v-img>
                        </v-card>
                        <v-btn color="success" v-for="(item, index) in boutique.categorias" :key="index">
                            {{ item.nombre }}
                        </v-btn>
                        <div>
                            <h1 class="boutique-nombre">{{ boutique.nombre }}</h1>
                        </div>
                    </v-flex>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-flex>
                        <div>
                            <h1>Telefono</h1>
                        </div>
                        <div>
                            <h1>{{ boutique.telefono }}</h1>
                        </div>
                    </v-flex>
                </v-col>
                <v-col>
                    <v-flex>
                        <div>
                            <h1>Direccion</h1>
                        </div>
                        <div>
                            <h1>{{ boutique.direccion }}</h1>
                        </div>
                    </v-flex>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-dialog v-model="modalPrenda" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark v-on="on">Agregar prenda</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="headline grey lighten-2" primary-title>
                                <span class="headline">Prenda</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" md="12">
                                            <v-text-field label="Nombre" required v-model="prenda.nombre"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <v-text-field label="Marca" required v-model="prenda.marca"></v-text-field>
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
                                                v-model="tallas"
                                                :items="categoria.tallas"
                                                label="Tallas"
                                                multiple
                                                chips
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <v-textarea label="Descripcion" required v-model="prenda.descripcion"></v-textarea>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <file-pond v-if="vista == 1"
                                                label-idle="Selecciona una imagen"
                                                accepted-file-types="image/jpeg, image/png, image/jpg"
                                                labelFileTypeNotAllowed="Solo imagenes jpeg o png"
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
                                <v-btn color="primary" text @click="modalPrenda = false">
                                    Cancel
                                </v-btn>
                                <v-btn color="primary" text @click="guardarPrenda">
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>
                            Prendas
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-col>
                                <v-select
                                :items="categorias"
                                item-text="nombre"
                                item-value="nombre"
                                label="Categoria"
                                v-model="categoria"
                                ></v-select>
                            </v-col>
                        </v-card-title>
                        <v-data-table
                            :headers="headers"
                            :items="prendasFiltradas"
                            :items-per-page="5"
                            class="elevation-1"
                            loading="true"
                            :search="search"

                        >
                            <template v-slot:item.action="{ item }">
                                <v-flex>
                                    <router-link :to="{ name: 'prendas', params: { id: item.id } }">
                                        <v-icon
                                            small
                                            class="mr-2"

                                        >
                                        remove_red_eye
                                        </v-icon>
                                    </router-link>
                                </v-flex>
                            </template>
                            <template v-slot:item.status="{ item }">
                                <v-switch
                                    v-model="item.publicado"
                                    @change="actualizarEstatus(item)"
                                ></v-switch>
                            </template>
                        </v-data-table>
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

import Swal from 'sweetalert2'

const FilePond = vueFilePond(FilePondPluginValidateType)

export default {
    components: {
        FilePond
    },
    data(){
        return{
            vista: 1,
            cropper: null,
            load: false,
            boutique: null,
            newBoutique:null,
            //Modal
            modalPrenda: false,
            modalBoutique: false,
            categoriaSeleccionada: null,
            categoria: '',
            categorias: [],

            //Tabla
            search: '',
            headers: [
                {
                    text: 'Nombre',
                    align: 'left',
                    sortable: false,
                    value: 'nombre',
                },
                { text: 'Marca', value: 'marca' },
                { text: 'Tallas', value: 'tallas' },
                { text: 'Likes', value: 'likes'},
                { text: 'Dislikes', value: 'dislikes'},
                { text: 'Opciones', value: 'action', sortable: false },
                { text: 'Estatus', value: 'status', sortable: false },
            ],
            prendas: [],


            //Tallas
            prenda: {
                nombre: '',
                marca: '',
                descripcion: '',
                foto: '',
            },
            tallas: [],
        }
    },
    computed: {
        prendasFiltradas() {
            //console.log(this.categoria)
            if (this.categoria === 'ninguna'){
              return this.prendas
            }
            return this.prendas.filter((i) => {
              return !this.categoria || (i.categoria === this.categoria);
            })
        }
    },
    async mounted(){
        let id = this.$route.params.id
        let response = await db.collection('boutiques').doc(id).get()

        if(response.exists){
            this.boutique = response.data();
            this.newBoutique = response.data();
        }

        db.collection('categorias').onSnapshot(response => {
            this.categorias = [{id:"",nombre:"ninguna"}];
            response.forEach(doc => {
                //console.log(doc.data())
                this.categorias.push(doc.data())
            })
        })

        if(this.boutique != null){
            db.collection('prendas')
                    .where('boutique', '==', this.boutique.id)
                    .onSnapshot(response => {
                        this.prendas = [];
                        response.forEach(doc => {
                            this.prendas.push(doc.data())
                        })
                    })
        }
    },
    watch:{
        //categoriaSeleccionada(){
        //    this.categoria = this.categorias.find(element => element.id == this.categoriaSeleccionada)
        //}
    },
    methods: {
        async guardarPrenda(){
            this.prenda.tallas = this.tallas
            this.prenda.categoria = this.categoria.nombre
            try{
                let response = await db.collection('prendas').add(this.prenda)
                let addId = await db.collection('prendas').doc(response.id).set({ id: response.id, boutique: this.boutique.id }, { merge: true })

                // let response = await db.collection('prendas').doc(this.boutique.id).set({id: this.boutique.id, nombre: this.boutique.nombre})
                // let prenda = await db.collection('prendas').doc(this.boutique.id).collection('ropa').add(this.prenda)
                // let addId = await db.collection('prendas').doc(this.boutique.id).collection('ropa').doc(prenda.id).update({ id: prenda.id })


                let canvas = this.cropper.getCroppedCanvas()
                let imagen = canvas.toDataURL('image/png')
                let fotoId = uuidv4()

                try {
                    let ref = storage.ref()
                    let resultado = await ref.child('boutiques/' + this.boutique.nombre + '/prendas/' + fotoId + '.png')
                                             .putString(imagen, 'data_url')

                    let URL = await resultado.ref.getDownloadURL()

                    await db.collection('prendas').doc(response.id).update({ foto: URL })
                } catch (e) {
                    console.log(e)
                }


                //let addId = await db.collection('prendas').doc(response.id).update({ id: response.id })
            }
            catch(e){
                console.log(e)
            }
            finally{
                this.modalPrenda = false
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

        async actualizarEstatus(item){
            try {
                let response = await db.collection('prendas').doc(item.id)
                response.update({ publicado: item.publicado })
            } catch (e) {
                console.log(e)
            }
        },

        async guardarBoutique(){
            try{
                let id = this.$route.params.id
                let response = await db.collection('boutiques').doc(id).get();

                if(response.exists){
                    await db.collection('boutiques').doc(id).update(this.newBoutique)
                    .then(()=>{
                        console.log("Boutique editada");
                    })
                    .catch((e) => {
                        console.log("Error editando boutique:", e);
                    })

                    try {
                        let canvas = this.cropper.getCroppedCanvas()
                        let imagen = canvas.toDataURL('image/png')
                        let fotoId = uuidv4()

                        let ref = storage.ref()
                        let resultado = await ref.child('boutiques/' + this.boutique.nombre + '/' + fotoId + '.png')
                                                 .putString(imagen, 'data_url')

                        let URL = await resultado.ref.getDownloadURL();

                        console.log(URL);

                        await db.collection('boutiques').doc(response.id).update({ logo: URL })
                    } catch (e) {
                        console.log(e)
                    }

                }
            } catch(e) {
                console.log(e)
            }finally{
                Swal.fire({
                    title: 'Boutique Editada!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                this.modalBoutique = false
            }
        }
    }
}
</script>

<style>
    .boutique-nombre{
        font-size: 1.5rem;
        color: red;
    }

    .filepond-drop-label{
        font-size: 14pt !important;
    }

    .edicionImagen{
        width: 100%;
    }
</style>
