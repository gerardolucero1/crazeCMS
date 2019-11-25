<template>
    <v-layout wrap>
        <v-flex xs12 sm6 lg3 v-for="(item, index) in boutiques" :key="index">
            <v-card class="elevation-5 ma-3" :to="{ name: 'boutique', params: { id: item.id } }">
                <v-img :src="item.logo">
                    <v-layout align-end justify-center fill-height>
                        <v-spacer></v-spacer>
                        <v-card-text class="boutique-nombre">
                            {{ item.nombre }}
                        </v-card-text>
                    </v-layout>
                </v-img>
            </v-card>
        </v-flex>
        <v-flex xs12 sm6 lg3>
            <v-dialog v-model="modalBoutique" width="500">
                <template v-slot:activator="{ on }">
                    <v-btn  color="red lighten-2" dark v-on="on">
                        Añadir nuevo
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                        Nueva boutique
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                            :error-messages="erroresBoutiqueNombre"
                            @blur="$v.nuevaBoutique.nombre.$touch()"
                            name="name"
                            label="Nombre"
                            id="nombre"
                            v-model="nuevaBoutique.nombre"
                        ></v-text-field>

                        <v-text-field
                            :error-messages="erroresBoutiqueTelefono"
                            @blur="$v.nuevaBoutique.telefono.$touch()"
                            name="name"
                            label="Telefono"
                            id="telefono"
                            v-model="nuevaBoutique.telefono"
                        ></v-text-field>

                        <v-text-field
                            :error-messages="erroresBoutiqueDireccion"
                            @blur="$v.nuevaBoutique.direccion.$touch()"
                            name="name"
                            label="Direccion"
                            id="direccion"
                            v-model="nuevaBoutique.direccion"
                        ></v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="$v.nuevaBoutique.$invalid" text @click="guardarBoutique">
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
    data(){
        return{
            modalBoutique: false,
            nuevaBoutique: {
                nombre: '',
                direccion: '',
                telefono: '',
            }
        }
    },
    validations: {
        nuevaBoutique:{
            nombre:{
                required,
            },
            direccion: {
                required,
            },
            telefono: {
                required,
            }
        }
    },
    computed: {
        ...mapState(
            'boutique', ['boutiques']
        ),

        erroresBoutiqueNombre: function(){
            let errores = []
            if(!this.$v.nuevaBoutique.nombre.$dirty){
                return errores
            }

            if(!this.$v.nuevaBoutique.nombre.required){
                errores.push('Ingresa un nombre')
            }

            return errores
        },

        erroresBoutiqueDireccion: function(){
            let errores = []
            if(!this.$v.nuevaBoutique.direccion.$dirty){
                return errores
            }

            if(!this.$v.nuevaBoutique.direccion.required){
                errores.push('Ingresa una direccion')
            }

            return errores
        },

        erroresBoutiqueTelefono: function(){
            let errores = []
            if(!this.$v.nuevaBoutique.telefono.$dirty){
                return errores
            }

            if(!this.$v.nuevaBoutique.telefono.required){
                errores.push('Ingresa un telefono')
            }

            return errores
        },
    },
    methods: {
        async guardarBoutique(){
            this.modalBoutique = false
        }
    }
}
</script>

<style>
    .boutique-nombre{
        font-size: 2.4rem;
        color: white;
        opacity: 0.9;
        vertical-align: end;
    }
</style>