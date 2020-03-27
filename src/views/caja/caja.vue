<template>
  <v-layout v-if="usuario.tipo == 1">
    <v-container>
      <v-row>
        <v-flex>
<!-- ABRIR CAJA -->
          <v-dialog v-if="!cajaAbierta" v-model="modalAbrir" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on" @click="checarApertura">Abrir Caja</v-btn>

              </template>
              <v-card >
                  <v-card-title class="headline grey lighten-2" primary-title>
                      <span class="headline">Abrir Caja</span>
                  </v-card-title>

                  <v-card-text>
                      <v-container>
                          <v-row>
                            <h2>Total del ultimo cierre: {{sumaUltimo}}  Total actual: {{sumaApertura}}</h2>
                            <h3 style="color:red" >{{discrepanciaBilletes}}</h3>
                          </v-row>
                          <v-row>
                            <v-col style="margin:25px">
                                <h3>Billetes</h3>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresMpesosA"
                                      @blur="$v.abrirCaja.mpesos.$touch()"
                                      name="1000 pesos"
                                      label="1000 pesos"
                                      type="number" id="mpesos"
                                      v-model="abrirCaja.mpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresDpesosA"
                                      @blur="$v.abrirCaja.dpesos.$touch()"
                                      name="500 pesos"
                                      label="500 pesos"
                                      type="number" id="dpesos"
                                      v-model="abrirCaja.dpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresCcpesosA"
                                      @blur="$v.abrirCaja.ccpesos.$touch()"
                                      name="200 pesos"
                                      label="200 pesos"
                                      type="number" id="ccpesos"
                                      v-model="abrirCaja.ccpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresCpesosA"
                                      @blur="$v.abrirCaja.cpesos.$touch()"
                                      name="100 pesos"
                                      label="100 pesos"
                                      type="number" id="cpesos"
                                      v-model="abrirCaja.cpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresLpesosA"
                                      @blur="$v.abrirCaja.lpesos.$touch()"
                                      name="50 pesos"
                                      label="50 pesos"
                                      type="number" id="lpesos"
                                      v-model="abrirCaja.lpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresXxpesosA"
                                      @blur="$v.abrirCaja.xxpesos.$touch()"
                                      name="20 pesos"
                                      label="20 pesos"
                                      type="number" id="xxpesos"
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
                                      type="number" id="xpesos"
                                      v-model="abrirCaja.xpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresVpesosA"
                                      @blur="$v.abrirCaja.vpesos.$touch()"
                                      name="5 pesos"
                                      label="5 pesos"
                                      type="number" id="vpesos"
                                      v-model="abrirCaja.vpesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresIipesosA"
                                      @blur="$v.abrirCaja.iipesos.$touch()"
                                      name="2 pesos"
                                      label="2 pesos"
                                      type="number" id="iipesos"
                                      v-model="abrirCaja.iipesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresIpesosA"
                                      @blur="$v.abrirCaja.ipesos.$touch()"
                                      name="1 pesos"
                                      label="1 pesos"
                                      type="number" id="ipesos"
                                      v-model="abrirCaja.ipesos"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresMedioPesoA"
                                      @blur="$v.abrirCaja.medioPeso.$touch()"
                                      name=".50 pesos"
                                      label=".50 pesos"
                                      type="number" id="medioPeso"
                                      v-model="abrirCaja.medioPeso"
                                  ></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field
                                      :error-messages="erroresVeinteCentavosA"
                                      @blur="$v.abrirCaja.veinteCentavos.$touch()"
                                      name=".20 pesos"
                                      label=".20 pesos"
                                      type="number" id="veinteCentavos"
                                      v-model="abrirCaja.veinteCentavos"
                                  ></v-text-field>
                                </v-row>
                            </v-col>
                          </v-row>
                      </v-container>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="cancelarApertura">
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
                  <v-btn color="primary" dark v-on="on" @click="checarCierre">Cerrar Caja</v-btn>
              </template>
              <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>
                      <span class="headline">Cerrar Caja</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                        <v-row>
                          <h2 >Total de la apertura: {{sumaApertura}}  Total actual: {{sumaCierre}}</h2>
                        </v-row>
                        <v-row>
                          <v-col style="margin:25px">
                              <h3>Billetes</h3>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresMpesosC"
                                    @blur="$v.cerrarCaja.mpesos.$touch()"
                                    name="1000 pesos"
                                    label="1000 pesos"
                                    type="number" id="mpesos"
                                    v-model="cerrarCaja.mpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresDpesosC"
                                    @blur="$v.cerrarCaja.dpesos.$touch()"
                                    name="500 pesos"
                                    label="500 pesos"
                                    type="number" id="dpesos"
                                    v-model="cerrarCaja.dpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresCcpesosC"
                                    @blur="$v.cerrarCaja.ccpesos.$touch()"
                                    name="200 pesos"
                                    label="200 pesos"
                                    type="number" id="ccpesos"
                                    v-model="cerrarCaja.ccpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresCpesosC"
                                    @blur="$v.cerrarCaja.cpesos.$touch()"
                                    name="100 pesos"
                                    label="100 pesos"
                                    type="number" id="cpesos"
                                    v-model="cerrarCaja.cpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresLpesosC"
                                    @blur="$v.cerrarCaja.lpesos.$touch()"
                                    name="50 pesos"
                                    label="50 pesos"
                                    type="number" id="lpesos"
                                    v-model="cerrarCaja.lpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresXxpesosC"
                                    @blur="$v.cerrarCaja.xxpesos.$touch()"
                                    name="20 pesos"
                                    label="20 pesos"
                                    type="number" id="xxpesos"
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
                                    type="number" id="xpesos"
                                    v-model="cerrarCaja.xpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresVpesosC"
                                    @blur="$v.cerrarCaja.vpesos.$touch()"
                                    name="5 pesos"
                                    label="5 pesos"
                                    type="number" id="vpesos"
                                    v-model="cerrarCaja.vpesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresIipesosC"
                                    @blur="$v.cerrarCaja.iipesos.$touch()"
                                    name="2 pesos"
                                    label="2 pesos"
                                    type="number" id="iipesos"
                                    v-model="cerrarCaja.iipesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresIpesosC"
                                    @blur="$v.cerrarCaja.ipesos.$touch()"
                                    name="1 pesos"
                                    label="1 pesos"
                                    type="number" id="ipesos"
                                    v-model="cerrarCaja.ipesos"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresMedioPesoC"
                                    @blur="$v.cerrarCaja.medioPeso.$touch()"
                                    name=".50 pesos"
                                    label=".50 pesos"
                                    type="number" id="medioPeso"
                                    v-model="cerrarCaja.medioPeso"
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                    :error-messages="erroresVeinteCentavosC"
                                    @blur="$v.cerrarCaja.veinteCentavos.$touch()"
                                    name=".20 pesos"
                                    label=".20 pesos"
                                    type="number" id="veinteCentavos"
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
                <v-card style="margin-bottom: 20px">
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


                <v-card style="margin-bottom: 20px">
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
                <h2>Subtotal: {{sumaCarro}}</h2>
                <v-dialog v-if="cajaAbierta" v-model="modalCobrar" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on" @click="$v.ticket.$touch()" >Cobrar</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>
                          <span class="headline">Cobrar</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <h2>Subtotal: {{sumaCarro}}</h2>
                          </v-row>
                          <v-row>
                            <v-select
                              :items="formaRecibo"
                              :error-messages="erroresTicket"
                              label="Forma del Recibo"
                              item-value="modoRecibo"
                              v-model="modoRecibo"
                            ></v-select>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="modalCobrar = false">
                              Cancel
                          </v-btn>
                          <v-btn color="primary" :disabled="modoRecibo==''" dark @click="cobrarCarro">
                              Cobrar
                          </v-btn>
                      </v-card-actions>
                  </v-card>
                </v-dialog>
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
  import jsPDF from 'jspdf'

  export default {
      components: {

      },
      data(){
          return{
            cajaAbierta: false,
            ultimaApertura: {},
            ultimoCierre: {},
            sumaCarro: 0,
            sumaUltimo: 0,
            sumaApertura: 0,
            sumaCierre: 0,
            sumaActual: 0,

            modalAbrir: false,
            discrepanciaBilletes: "",
            abrirCaja: {
              mpesos: 0, //1000
              dpesos: 0, //500
              ccpesos: 0, //200
              cpesos: 0,  //100
              lpesos: 0,  //50
              xxpesos: 0, //20
              xpesos: 0, //10
              vpesos: 0, //5
              iipesos: 0, //2
              ipesos: 0, //1
              medioPeso: 0, //.50
              veinteCentavos: 0, //.20,
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

            modalCobrar: false,
            formaRecibo: ['completa', 'ticket'],
            modoRecibo: '',
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
                { text: 'Precio', value: 'precio' },
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
        ticket: {
          required,
        },
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


          //ticket
          erroresTicket(){
            let errores = []
              if(!this.$v.ticket.$dirty){
                return errores
              }
              if(this.modoRecibo == ''){
                errores.push('Este campo es requerido')
              }
              return errores
          }
      },
      async mounted(){

          clearInterval(this.$options.contadorApertura);
          clearInterval(this.$options.contadorCierre);

          let id = this.$route.params.id
          let responseBoutique = await db.collection('boutiques').doc(id).get()
          let responseCaja = await db.collection('boutiques/'+id+'/actual').doc('caja').get()
          this.cajaAbierta = responseCaja.data().activa

          this.inicializar(this.abrirCaja)

          if(this.cajaAbierta){
            this.transferirObj(responseCaja.data(), this.actualCaja)
            this.transferirObj(responseCaja.data(), this.abrirCaja)
            this.$options.contadorCarro = setInterval(this.subtotalCarro, 100);
          }

          if(responseBoutique.exists){
              this.boutique = responseBoutique.data();
              this.newBoutique = responseBoutique.data();
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

          await db.collection('boutiques/'+id+'/aperturas')
            .orderBy('fecha', 'desc') // Order documents by added_at field in descending order
            .limit(1)
            .get()
            .then((snapshot)=>{
              snapshot.forEach((doc)=>{
                if(doc.exists){
                  this.ultimaApertura = doc.data()
                }
              })
            })

          await db.collection('boutiques/'+id+'/cierres')
            .orderBy('fecha', 'desc') // Order documents by added_at field in descending order
            .limit(1)
            .get()
            .then((snapshot)=>{
              snapshot.forEach((doc)=>{
                if(doc.exists){
                  this.ultimoCierre = doc.data()
                }
              })
            })

          if (this.ultimaApertura.fecha && this.ultimoCierre.fecha){
            //console.log('existen')
            if(this.ultimaApertura.fecha.toDate() < this.ultimoCierre.fecha.toDate()){
              //console.log('todo funciona correctamente')
              this.sumaCaja(this.ultimoCierre).then((result)=>{
                this.sumaUltimo = result
              })
            } else {
              this.mostrarAdvertencia('el ultimo cierre es antes de la ultima apertura')
              this.sumaCaja(this.ultimaApertura).then((result)=>{
                this.sumaUltimo = result
              })
            }
          } else {
            if (!this.ultimaApertura.fecha && !this.ultimoCierre.fecha){
              this.mostrarAdvertencia('primera apertura')
              this.sumaUltimo=0
            }
            if (!this.ultimaApertura.fecha && this.ultimoCierre.fecha){
              this.mostrarAdvertencia('no se registro la primera apertura')
              this.sumaCaja(this.ultimoCierre).then((result)=>{
                this.sumaUltimo = result
              })
            }
            if (this.ultimaApertura.fecha && !this.ultimoCierre.fecha){
              this.mostrarAdvertencia('no se cerro la primera apertura')
              this.sumaCaja(this.ultimaApertura).then((result)=>{
                this.sumaUltimo = result
              })
            }
          }
      },
      destroyed() {
        clearInterval(this.$options.contadorCarro);
        clearInterval(this.$options.contadorApertura);
        clearInterval(this.$options.contadorCierre);
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
          createPDF (type, list) {
            let pdfName = 'test';
            var doc = new jsPDF();
            doc.text("Hello World", 10, 10);
            doc.output('dataurlnewwindow',{filename: 'ejemplo.pdf'});
          },

          async inicializar(){
            let caja = {}
            caja.mpesos= 0
            caja.dpesos= 0
            caja.ccpesos= 0
            caja.cpesos= 0
            caja.lpesos= 0
            caja.xxpesos= 0
            caja.xpesos= 0
            caja.vpesos= 0
            caja.iipesos= 0
            caja.ipesos= 0
            caja.medioPeso= 0
            caja.veinteCentavos= 0
            return caja
          },

          async transferirObj(fuente, destino){
            for( var el in fuente ) {
              if( fuente.hasOwnProperty( el )) {
                destino[el] = fuente[el]
              }
            }
          },

          async sumaCaja(obj){
            var sum = 0;
            sum = (parseInt(obj.mpesos)*1000) + (parseInt(obj.dpesos)*500) + (parseInt(obj.ccpesos)*200) + (parseInt(obj.cpesos)*100) + (parseInt(obj.lpesos)*50) + (parseInt(obj.xxpesos)*20) + (parseInt(obj.xpesos)*10) + (parseInt(obj.vpesos)*5) + (parseInt(obj.iipesos)*2) + parseInt(obj.ipesos) + (parseInt(obj.medioPeso)*.5) + (parseInt(obj.veinteCentavos)*.2)
            //for( var el in obj ) {
            //  if( obj.hasOwnProperty( el ) ) {
            //    sum += parseInt( obj[el] );
            //  }
            //}
            return sum;
          },

          async parseCaja(obj){
            for( var el in obj ) {
              if( obj.hasOwnProperty( el ) ) {
                obj[el] = parseInt( obj[el] );
              }
            }
          },

          //calculo subtotal
          //carro
          async subtotalCarro(){
            let subtotal = 0
            if (this.carro.length>0){
              this.carro.forEach((item)=>{
                subtotal+=parseFloat(item.precio)
              })
            }
            //console.log(subtotal)
            this.sumaCarro = subtotal
          },

          //apertura caja
          async subtotalApertura(){
            let ejemplos = ''
            this.discrepanciaBilletes = ''
            for( var el in this.abrirCaja ) {
              if( this.abrirCaja.hasOwnProperty( el ) && el!="fecha" && el!="activa" && (parseInt(this.abrirCaja[el]) != parseInt(this.ultimoCierre[el])) ) {
                switch(el){
                  case 'mpesos':
                    ejemplos+= ' 1000 pesos'
                  break;
                  case 'dpesos':
                    ejemplos+= ' 500 pesos'
                  break;
                  case 'ccpesos':
                    ejemplos+= ' 200 pesos'
                  break;
                  case 'cpesos':
                    ejemplos+= ' 100 pesos'
                  break;
                  case 'lpesos':
                    ejemplos+= ' 50 pesos'
                  break;
                  case 'xxpesos':
                    ejemplos+= ' 20 pesos'
                  break;
                  case 'xpesos':
                    ejemplos+= ' 10 pesos'
                  break;
                  case 'vpesos':
                    ejemplos+= ' 5 pesos'
                  break;
                  case 'iipesos':
                    ejemplos+= ' 2 pesos'
                  break;
                  case 'ipesos':
                    ejemplos+= ' 1 pesos'
                  break;
                  case 'medioPeso':
                    ejemplos+= ' .50 pesos'
                  break;
                  case 'veinteCentavos':
                    ejemplos+= ' .20 pesos'
                  break;
                }
              }
            }
            if(ejemplos!=''){
              let regex = /s /g
              ejemplos = ejemplos.replace(regex, 's, ')
              this.discrepanciaBilletes='Los siguientes campos no coinciden con el cierre anterior: '+ejemplos
            }
            this.sumaCaja(this.abrirCaja).then((resultado)=>{
              //console.log(resultado)
              this.sumaApertura = resultado
            })
          },

          //cierra caja
          async subtotalCierre(){
            this.sumaCaja(this.cerrarCaja).then((resultado)=>{
              this.sumaCierre = resultado
            })
          },

          async checarApertura(){
              try{
                  this.$options.contadorApertura = setInterval(this.subtotalApertura, 100);
              }
              catch(error){
                  console.log(error)
                  this.mostrarError('Ocurrio un error desconocido abriendo la caja')
              }
          },

          async cancelarApertura(){
            clearInterval(this.$options.contadorApertura);
            this.modalAbrir = false
          },

          async iniciarCaja(){
            try{
              this.mostrarOcupado({ titulo: 'Creando registro', mensaje: 'Estamos registrando tus datos' })

              clearInterval(this.$options.contadorApertura);
              this.parseCaja(this.abrirCaja)
              this.abrirCaja.fecha= new Date()
              this.abrirCaja.activa= true

              let id = this.$route.params.id

              await db.collection('boutiques/'+id+'/aperturas').add(this.abrirCaja)
                .then((doc)=>{
                  this.abrirCaja.actualId = doc.id
                })

              await db.collection('boutiques/'+id+'/actual').doc('caja').set(this.abrirCaja)

              this.sumaActual = this.sumaApertura

              this.cajaAbierta= true

              this.modalAbrir = false

              this.$options.contadorCarro = setInterval(this.subtotalCarro, 100);

              this.transferirObj(this.abrirCaja,this.actualCaja)

            }
            catch(error){
              console.log(error)
              this.mostrarError('Ocurrio un error desconocido registrando la apertura la caja')
            }
            finally{
              this.ocultarOcupado()
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
          //console.log(item)
            this.carro = this.carro.filter(function(value, index, arr){ return (value.carroId !=item.carroId )})
          },

          async limpiarCarro(){
            this.carro = this.carro.filter(function(value, index, arr){ return false })
          },

          async cobrarCarro(){
            clearInterval(this.$options.contadorCarro);
            let id  = this.$route.params.id
            let bddObj = {}
            let ticketObj = {}

            bddObj.lista = this.carro
            bddObj.total = this.sumaCarro
            bddObj.aperturaId = this.abrirCaja.actualId
            bddObj.modoRecibo = this.modoRecibo
            bddObj.fecha= new Date()

            bddObj.lista.forEach((item)=>{
              if(ticketObj[item.id]>=1){
                ticketObj[item.id]++
              }else{
                ticketObj[item.id]=1
              }
            })
            //console.log(ticketObj)
            bddObj.cantidades = ticketObj

            for( var el in ticketObj ) {
              if( ticketObj.hasOwnProperty( el ) ) {
                let unidades = 0
                console.log(el.toString())
                let ref = await db.collection('prendas').doc(el.toString())
                await ref.get().then((doc)=>{
                  unidades = doc.data().unidades })
                await ref.update({unidades : unidades - ticketObj[el]})
              }
            }

            await db.collection('boutiques/'+id+'/pagos').doc().set(bddObj)

            this.createPDF(bddObj.modoRecibo, bddObj.lista)

            this.limpiarCarro()
            this.$options.contadorCarro = setInterval(this.subtotalCarro, 100);
            this.modalCobrar = false
          },

          async checarCierre(){
              try{
                this.transferirObj(this.actualCaja,this.cerrarCaja)
                this.$options.contadorCierre = setInterval(this.subtotalCierre, 100);
              }
              catch(error){
                  console.log(error)
                  this.mostrarError('Ocurrio un error desconocido abriendo la caja')
              }

          },

          async cancelarCierre(){
            clearInterval(this.$options.contadorCierre);
            this.modalCerrar = false
          },

          async terminarCaja(){
            try{
              this.mostrarOcupado({ titulo: 'Creando registro', mensaje: 'Estamos registrando tus datos' })
              clearInterval(this.$options.contadorCarro);
              clearInterval(this.$options.contadorCierre);
              this.parseCaja(this.cerrarCaja)
              this.cerrarCaja.fecha= new Date()
              this.cerrarCaja.activa = false

              let id = this.$route.params.id

              await db.collection('boutiques/'+id+'/cierres').doc().set(this.cerrarCaja)
              await db.collection('boutiques/'+id+'/actual').doc('caja').set(this.cerrarCaja)

              this.sumaActual = 0

              this.transferirObj(this.cerrarCaja,this.ultimoCierre)

              this.cajaAbierta= false

              this.modalCerrar = false

            }
            catch(error){
              console.log(error)
              this.mostrarError('Ocurrio un error desconocido registrando el cierre de caja')
            }
            finally{

              this.ocultarOcupado()
            }
          },
      }
  }
</script>

<style>
</style>
