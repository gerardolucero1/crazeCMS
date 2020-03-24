<template>
  <v-layout v-if="usuario.tipo == 1">
    <v-container grid-list-xs >
      <v-row>
        <v-column style="margin:25px">

            <h3>Billetes</h3>


            <p>1000 pesos</p>


            <p>500 pesos</p>


            <p>200 pesos</p>


            <p>100 pesos</p>


            <p>50 pesos</p>


            <p>20 pesos</p>

        </v-column>

        <v-column style="margin:25px">

            <h3>Monedas</h3>


            <p>10 pesos</p>


            <p>5 pesos</p>


            <p>2 pesos</p>


            <p>1 peso</p>


            <p>50 centavos</p>

        </v-column>
        <v-column>
          
        </v-column>
      </v-row>
    </v-container>
  </v-layout>
  <v-layout v-else-if="usuario.tipo != 1">
    <h1>"Esta ventana esta solo disponible a usuarios duenos de una boutique"</h1>
  </v-layout>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
      components: {

      },
      data(){
          return{

          }
      },
      computed: {


          ...mapState(
              'sesion', ['usuario']
          )
      },
      methods: {
          ...mapActions(
              'sesion', ['cerrarSesion']
          )
      }
  }
</script>

<style>
</style>
