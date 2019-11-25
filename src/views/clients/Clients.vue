<template>
    <v-layout>
        <v-flex>
            <v-card>
                <template>
                    <v-card-title>
                        Usuarios 
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
                        :items="usuarios"
                        :items-per-page="5"
                        class="elevation-1"
                        loading="true"
                        :search="search"
                    >
                        <template v-slot:item.action="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editarUsuario(item)"
                            >
                            edit
                            </v-icon>
                            <v-icon
                                small
                                class="mr-2"
                                @click="eliminarUsuario(item)"
                            >
                            delete
                            </v-icon>
                            <v-icon
                                small
                                @click="agregarBoutique(item)"
                            >
                            store
                            </v-icon>
                        </template>
                    </v-data-table>
                </template>
            </v-card>
        </v-flex>

        <!-- Editar Cliente -->
        <template>
            <v-dialog v-model="editClient" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            :error-messages="erroresNombres"
                            @blur="$v.usuarioEdicion.nombres.$touch()"
                            autofocus
                            name="name"
                            label="name"
                            id="name"
                            v-model="usuarioEdicion.nombres"
                        ></v-text-field>

                        <v-text-field
                            :error-messages="erroresApellidos"
                            @blur="$v.usuarioEdicion.apellidos.$touch()"
                            name="apellido"
                            label="apellido"
                            id="apellido"
                            @keyup.enter="siguiente(2)"
                            v-model="usuarioEdicion.apellidos"
                        ></v-text-field>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="editClient = false">Cerrar</v-btn>
                        <v-btn color="blue darken-1" :disabled="$v.usuarioEdicion.$invalid" text @click="actualizarUsuario()">Actualizar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
        <!-- Agregar boutique -->
        <template>
            <v-dialog v-model="addBoutique" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Agregar boutique</span>
                    </v-card-title>
                    <v-card-text>
                        <v-select
                            :items="boutiquesFiltro"
                            label="Standard"
                            v-model="boutiqueVal"
                        ></v-select>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="addBoutique = false">Cerrar</v-btn>
                        <v-btn color="blue darken-1" :disabled="$v.usuarioEdicion.$invalid" text @click="actualizarUsuario()">Actualizar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
    </v-layout>
</template>

<script>
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import { nombreCompuesto } from '@/utilities/validations'
import { db } from '@/firebase'

export default {
    data(){
        return{
            editClient: false,
            addBoutique: false,
            search: '',
            headers: [
                {
                    text: 'Nombre',
                    align: 'left',
                    sortable: true,
                    value: 'nombres',
                },
                { text: 'Apellidos', value: 'apellidos' },
                { text: 'Nombre de usuario', value: 'userName' },
                { text: 'Sexo', value: 'sexo' },
                { text: 'Opciones', value: 'action', sortable: false },
            ],
            usuarios: [],
            boutiques: [],
            boutiqueVal: '',
            usuarioEdicion: {},
        }
    },
    validations: {
        usuarioEdicion: {
            nombres: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20),
                nombreCompuesto
            },
            apellidos: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20),
                nombreCompuesto
            },
        },
    },
    mounted() {
        //Obtenemos a los usuario
        db.collection('usuarios').onSnapshot(response => {
            this.usuarios = [];
            response.forEach(doc => {
                this.usuarios.push(doc.data())
            })
        })

        //Obtenemos las boutiques
        db.collection('boutiques').onSnapshot(response => {
            this.boutiques = [];
            response.forEach(doc => {
                this.boutiques.push(doc.data())
            })
        })
    },
    computed: {
        boutiquesFiltro: function(){
            let boutiques = []
            this.boutiques.forEach(element => {
                let item = {
                    text: element.nombre,
                    value: element.id
                }
                boutiques.push(item)
            })

            return boutiques
        },

        erroresNombres: function(){
            let errores = []
            if(!this.$v.usuarioEdicion.nombres.$dirty){
                return errores
            }

            if(!this.$v.usuarioEdicion.nombres.required){
                errores.push('Ingresa tu nombre')
            }

            if(!this.$v.usuarioEdicion.nombres.minLength){
                errores.push('Ingresa un nombre de minimo 3 caracteres')
            }

            if(!this.$v.usuarioEdicion.nombres.maxLength){
                errores.push('Ingresa un nombre de maximo 20 caracteres')
            }

            if(!this.$v.usuarioEdicion.nombres.nombreCompuesto){
                errores.push('Ingresa un nombre valido')
            }

            return errores
        },

        erroresApellidos: function(){
            let errores = []
            if(!this.$v.usuarioEdicion.apellidos.$dirty){
                return errores
            }

            if(!this.$v.usuarioEdicion.apellidos.required){
                errores.push('Ingresa tus apellidos')
            }

            if(!this.$v.usuarioEdicion.apellidos.minLength){
                errores.push('Ingresa un apellido de minimo 3 caracteres')
            }

            if(!this.$v.usuarioEdicion.apellidos.maxLength){
                errores.push('Ingresa un apellido de maximo 20 caracteres')
            }

            if(!this.$v.usuarioEdicion.apellidos.nombreCompuesto){
                errores.push('Ingresa un apellido valido')
            }

            return errores
        },
    },
    methods: {
        async eliminarUsuario(item){
            try {
                let {value: response} = await Swal.fire({
                                    title: 'Are you sure?',
                                    text: `Warning, your image file is too heavy for this specific format.`,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes, Keep it!',
                                    cancelButtonText: 'No, Cancel it'
                                })
                if(response){
                    let res = await db.collection('usuarios').doc(item.uid).delete()
                }
            } catch (e) {
            
            }
        },

        editarUsuario(item){
            this.editClient = true
            this.usuarioEdicion = item
        },

        agregarBoutique(item){
            this.addBoutique = true
            this.usuarioEdicion = item
        },

        async actualizarUsuario(){
            try {
                let response = await db.collection('usuarios').doc(this.usuarioEdicion.uid).update(this.usuarioEdicion)
                
            } catch (e) {
            
            }
            finally{
                Swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                )
                this.editClient = false
            }
        }
    }
}
</script>

<style>

</style>