<template>
  <v-layout v-if="usuario.tipo == 1">
    <v-container>
      <v-row>
        <v-flex>
<!-- ABRIR CAJA -->
          <v-dialog v-if="!cajaAbierta" v-model="modalAbrir" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on">Abrir Caja</v-btn>

              </template>
              <v-card >
                  <v-card-title class="headline grey lighten-2" primary-title>
                      <span class="headline">Abrir Caja</span>
                  </v-card-title>

                  <v-card-text>
                      <v-container>
                          <v-row>
                            <v-col style="margin:25px">
                                <h3>Billetes</h3>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresMpesosA"
                                      @blur="$v.abrirCaja.mpesos.$touch()"
                                      name="1000 pesos"
                                      label="1000 pesos"
                                      id="mpesos"
                                      v-model="abrirCaja.mpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresDpesosA"
                                      @blur="$v.abrirCaja.dpesos.$touch()"
                                      name="500 pesos"
                                      label="500 pesos"
                                      id="dpesos"
                                      v-model="abrirCaja.dpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresCcpesosA"
                                      @blur="$v.abrirCaja.ccpesos.$touch()"
                                      name="200 pesos"
                                      label="200 pesos"
                                      id="ccpesos"
                                      v-model="abrirCaja.ccpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresCpesosA"
                                      @blur="$v.abrirCaja.cpesos.$touch()"
                                      name="100 pesos"
                                      label="100 pesos"
                                      id="cpesos"
                                      v-model="abrirCaja.cpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresLpesosA"
                                      @blur="$v.abrirCaja.lpesos.$touch()"
                                      name="50 pesos"
                                      label="50 pesos"
                                      id="lpesos"
                                      v-model="abrirCaja.lpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresXxpesosA"
                                      @blur="$v.abrirCaja.xxpesos.$touch()"
                                      name="20 pesos"
                                      label="20 pesos"
                                      id="xxpesos"
                                      v-model="abrirCaja.xxpesos"
                                  ></v-text-field>
                                </v-row>
                            </v-col>

                            <v-col style="margin:25px">
                                <h3>Monedas</h3>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresXpesosA"
                                      @blur="$v.abrirCaja.xpesos.$touch()"
                                      name="10 pesos"
                                      label="10 pesos"
                                      id="xpesos"
                                      v-model="abrirCaja.xpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresVpesosA"
                                      @blur="$v.abrirCaja.vpesos.$touch()"
                                      name="5 pesos"
                                      label="5 pesos"
                                      id="vpesos"
                                      v-model="abrirCaja.vpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresIipesosA"
                                      @blur="$v.abrirCaja.iipesos.$touch()"
                                      name="2 pesos"
                                      label="2 pesos"
                                      id="iipesos"
                                      v-model="abrirCaja.iipesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresIpesosA"
                                      @blur="$v.abrirCaja.ipesos.$touch()"
                                      name="1 pesos"
                                      label="1 pesos"
                                      id="ipesos"
                                      v-model="abrirCaja.ipesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresMedioPesoA"
                                      @blur="$v.abrirCaja.medioPeso.$touch()"
                                      name=".50 pesos"
                                      label=".50 pesos"
                                      id="medioPeso"
                                      v-model="abrirCaja.medioPeso"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresVeinteCentavosA"
                                      @blur="$v.abrirCaja.veinteCentavos.$touch()"
                                      name=".20 pesos"
                                      label=".20 pesos"
                                      id="veinteCentavos"
                                      v-model="abrirCaja.veinteCentavos"
                                  ></v-text-field>
                                </v-row>
                            </v-col>
                          </v-row>
                      </v-container>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="modalAbrir = false">
                          Cancel
                      </v-btn>
                      <v-btn color="primary" text @click="iniciarCaja">
                          Guardar
                      </v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>
<!-- CERRAR CAJA-->
          <v-dialog v-if="cajaAbierta" v-model="modalCerrar" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on">Cerrar Caja</v-btn>
              </template>
              <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>
                      <span class="headline">Cerrar Caja</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                        <v-row>
                          <v-col style="margin:25px">
                              <h3>Billetes</h3>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresMpesosC"
                                    @blur="$v.cerrarCaja.mpesos.$touch()"
                                    name="1000 pesos"
                                    label="1000 pesos"
                                    id="mpesos"
                                    v-model="cerrarCaja.mpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresDpesosC"
                                    @blur="$v.cerrarCaja.dpesos.$touch()"
                                    name="500 pesos"
                                    label="500 pesos"
                                    id="dpesos"
                                    v-model="cerrarCaja.dpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresCcpesosC"
                                    @blur="$v.cerrarCaja.ccpesos.$touch()"
                                    name="200 pesos"
                                    label="200 pesos"
                                    id="ccpesos"
                                    v-model="cerrarCaja.ccpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresCpesosC"
                                    @blur="$v.cerrarCaja.cpesos.$touch()"
                                    name="100 pesos"
                                    label="100 pesos"
                                    id="cpesos"
                                    v-model="cerrarCaja.cpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresLpesosC"
                                    @blur="$v.cerrarCaja.lpesos.$touch()"
                                    name="50 pesos"
                                    label="50 pesos"
                                    id="lpesos"
                                    v-model="cerrarCaja.lpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresXxpesosC"
                                    @blur="$v.cerrarCaja.xxpesos.$touch()"
                                    name="20 pesos"
                                    label="20 pesos"
                                    id="xxpesos"
                                    v-model="cerrarCaja.xxpesos"
                                ></v-text-field>
                              </v-row>
                          </v-col>

                          <v-col style="margin:25px">
                              <h3>Monedas</h3>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresXpesosC"
                                    @blur="$v.cerrarCaja.xpesos.$touch()"
                                    name="10 pesos"
                                    label="10 pesos"
                                    id="xpesos"
                                    v-model="cerrarCaja.xpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresVpesosC"
                                    @blur="$v.cerrarCaja.vpesos.$touch()"
                                    name="5 pesos"
                                    label="5 pesos"
                                    id="vpesos"
                                    v-model="cerrarCaja.vpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresIipesosC"
                                    @blur="$v.cerrarCaja.iipesos.$touch()"
                                    name="2 pesos"
                                    label="2 pesos"
                                    id="iipesos"
                                    v-model="cerrarCaja.iipesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresIpesosC"
                                    @blur="$v.cerrarCaja.ipesos.$touch()"
                                    name="1 pesos"
                                    label="1 pesos"
                                    id="ipesos"
                                    v-model="cerrarCaja.ipesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresMedioPesoC"
                                    @blur="$v.cerrarCaja.medioPeso.$touch()"
                                    name=".50 pesos"
                                    label=".50 pesos"
                                    id="medioPeso"
                                    v-model="cerrarCaja.medioPeso"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresVeinteCentavosC"
                                    @blur="$v.cerrarCaja.veinteCentavos.$touch()"
                                    name=".20 pesos"
                                    label=".20 pesos"
                                    id="veinteCentavos"
                                    v-model="cerrarCaja.veinteCentavos"
                                ></v-text-field>
                              </v-row>
                          </v-col>
                        </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="modalCerrar = false">
                          Cancel
                      </v-btn>
                      <v-btn color="primary" text @click="terminarCaja">
                          Guardar
                      </v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>
          <v-container v-if="cajaAbierta">
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
                            <v-btn color="primary" dark @click="agregarCarro(item)">
                                Agregar
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>


                <v-card>
                    <v-card-title>
                        Carro
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
                        <v-btn :disabled="carro.length==0" color="primary" dark @click="limpiarCarro">
                            Remover todos los items
                        </v-btn>
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="carro"
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
                            <v-btn color="primary" dark @click="removerCarro(item)">
                                Remover
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
          </v-container>
          <v-container v-if="!cajaAbierta">
            <h1>Abrir Caja para continuar</h1>
          </v-container>
        </v-flex>
      </v-row>
    </v-container>
  </v-layout>
  <v-layout v-else-if="usuario.tipo != 1">
    <h1>"Esta ventana esta solo disponible a usuarios duenos de una boutique"</h1>
  </v-layout>
</template>

<script>
  import { auth, firebase, db , storage } from '@/firebase'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { required, minValue } from 'vuelidate/lib/validators'

  export default {
      components: {

      },
      data(){
          return{
            cajaAbierta: false,

            modalAbrir: false,
            abrirCaja: {
              mpesos: 0,
              dpesos: 0,
              ccpesos: 0,
              cpesos: 0,
              lpesos: 0,
              xxpesos: 0,
              xpesos: 0,
              vpesos: 0,
              iipesos: 0,
              ipesos: 0,
              medioPeso: 0,
              veinteCentavos: 0,
            },
            actualCaja: {
              mpesos: 0,
              dpesos: 0,
              ccpesos: 0,
              cpesos: 0,
              lpesos: 0,
              xxpesos: 0,
              xpesos: 0,
              vpesos: 0,
              iipesos: 0,
              ipesos: 0,
              medioPeso: 0,
              veinteCentavos: 0,
            },
            modalCerrar: false,
            cerrarCaja: {
              mpesos: 0,
              dpesos: 0,
              ccpesos: 0,
              cpesos: 0,
              lpesos: 0,
              xxpesos: 0,
              xpesos: 0,
              vpesos: 0,
              iipesos: 0,
              ipesos: 0,
              medioPeso: 0,
              veinteCentavos: 0,
            },

            carro: [],

            search: '',
            categoriaSeleccionada: null,
            categoria: '',
            categorias: [],

            headers: [
                {
                    text: 'Nombre',
                    align: 'left',
                    sortable: false,
                    value: 'nombre',
                },
                { text: 'Marca', value: 'marca' },
                { text: 'Tallas', value: 'tallas' },
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
      validations:{
        abrirCaja:  {
          mpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          dpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          ccpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          cpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          lpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          xxpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          xpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          vpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          iipesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          ipesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          medioPeso:{
            minimo: (value) => parseInt(value) >= 0,
          },
          veinteCentavos:{
            minimo: (value) => parseInt(value) >= 0,
          },
        },
        cerrarCaja: {
          mpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          dpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          ccpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          cpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          lpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          xxpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          xpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          vpesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          iipesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          ipesos:{
            minimo: (value) => parseInt(value) >= 0,
          },
          medioPeso:{
            minimo: (value) => parseInt(value) >= 0,
          },
          veinteCentavos:{
            minimo: (value) => parseInt(value) >= 0,
          },
        },
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
          },
          ...mapState(
              'sesion', ['usuario']
          ),

          //abrir caja errores
          erroresMpesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.mpesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.mpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresDpesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.dpesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.dpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresCcpesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.ccpesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.ccpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresCpesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.cpesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.cpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresLpesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.lpesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.lpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresXxpesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.xxpesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.xxpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresXpesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.xpesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.xpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresVpesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.vpesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.vpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresIipesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.iipesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.iipesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresIpesosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.ipesos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.ipesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresMedioPesoA: function(){
            let errores = []
              if(!this.$v.abrirCaja.medioPeso.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.medioPeso.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresVeinteCentavosA: function(){
            let errores = []
              if(!this.$v.abrirCaja.veinteCentavos.$dirty){
                  return errores
              }
              if(!this.$v.abrirCaja.veinteCentavos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },

          //cerrar caja errores
          erroresMpesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.mpesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.mpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresDpesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.dpesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.dpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresCcpesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.ccpesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.ccpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresCpesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.cpesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.cpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresLpesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.lpesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.lpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresXxpesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.xxpesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.xxpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresXpesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.xpesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.xpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresVpesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.vpesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.vpesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresIipesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.iipesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.iipesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresIpesosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.ipesos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.ipesos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresMedioPesoC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.medioPeso.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.medioPeso.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
          erroresVeinteCentavosC: function(){
            let errores = []
              if(!this.$v.cerrarCaja.veinteCentavos.$dirty){
                  return errores
              }
              if(!this.$v.cerrarCaja.veinteCentavos.minimo){
                  errores.push('No puede haber numeros negativos en este campo')
              }
            return errores
          },
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
      methods: {
          ...mapMutations([
              'mostrarOcupado',
              'ocultarOcupado',
              'mostrarExito',
              'mostrarError',
              'mostrarAdvertencia'
          ]),
          ...mapActions(
              'sesion', ['cerrarSesion']
          ),

          async iniciarCaja(){
              try{
                  this.cajaAbierta= true
                  let id = this.$route.params.id
                  let response = await db.collection('boutiques').doc(id).get();
                  this.mostrarOcupado({ titulo: 'Creando registro', mensaje: 'Estamos registrando tus datos' })



                  //let credencial = await secondAuth.createUserWithEmailAndPassword(this.formulario.email, this.formulario.password)
                  //let uid = credencial.user.uid

                  //await this.guardarUsuario(uid)

                  //await secondAuth.currentUser.sendEmailVerification()

                  //await secondAuth.signOut();

                  //this.$router.push({ name: 'verificacion-email' })
              }
              catch(error){
                  console.log(error)
                  switch (error.code) {
                      case 'auth/email-already-in-use':
                          this.mostrarAdvertencia('Ya se ha hecho una apertura de caja sin cerrar')
                          break;

                      default:
                          this.mostrarError('Ocurrio un error registrando tu cuenta')
                          break;
                  }
              }
              finally{
                  this.ocultarOcupado()
                  this.modalAbrir = false
              }
          },

          async agregarCarro(item){
            var dupe = {
                "boutique":item.boutique,
                "categoria":item.categoria,
                "descripcion":item.descripcion,
                "foto":item.foto,
                "id":item.id,
                "marca":item.marca,
                "nombre":item.nombre,
                "precio":item.precio,
                "tallas":item.tallas,
                "numero": 1
                }

            for(var i = 0; i<this.carro.length; i++){
              if (this.carro[i].id == dupe.id){
                if(this.carro[i].numero == dupe.numero ){
                  dupe.numero++
                } else if(this.carro[i].numero > dupe.numero){
                  dupe.numero = this.carro[i].numero + 1
                }
              }
            }

            dupe.nombre = dupe.nombre + '-' + dupe.numero
            dupe.carroId = dupe.id + '-' +dupe.numero

            this.carro.push(dupe)
          },

          async removerCarro(item){
          console.log(item)
            this.carro = this.carro.filter(function(value, index, arr){ return (value.carroId !=item.carroId )})
          },

          async limpiarCarro(){
            this.carro = this.carro.filter(function(value, index, arr){ return false })
          },

          async terminarCaja(){
              try{
                  this.cajaAbierta= false
                  let id = this.$route.params.id
                  let response = await db.collection('boutiques').doc(id).get();
                  this.mostrarOcupado({ titulo: 'Creando registro', mensaje: 'Estamos registrando tus datos' })



                  //let credencial = await secondAuth.createUserWithEmailAndPassword(this.formulario.email, this.formulario.password)
                  //let uid = credencial.user.uid

                  //await this.guardarUsuario(uid)

                  //await secondAuth.currentUser.sendEmailVerification()

                  //await secondAuth.signOut();

                  //this.$router.push({ name: 'verificacion-email' })
              }
              catch(error){
                  console.log(error)
                  switch (error.code) {
                      case 'auth/email-already-in-use':
                          this.mostrarAdvertencia('Ya se ha hecho una apertura de caja sin cerrar')
                          break;

                      default:
                          this.mostrarError('Ocurrio un error registrando tu cuenta')
                          break;
                  }
              }
              finally{
                  this.ocultarOcupado()
                  this.modalCerrar = false
              }
          },
      }
  }
</script>

<style>
</style>
