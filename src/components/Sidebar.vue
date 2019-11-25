<template>
   
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Sidebar',
    props: {
        menu: {
            type: Boolean,
            required: true,
        }
    },
    computed: {
      ...mapState(
        'sesion', ['usuario']
      ),
    
    },
    methods: {
      ...mapActions(
        'sesion', ['cerrarSesion'],
      ),

      salir(){
        this.cerrarSesion()
        this.menu = false
        this.$router.push({ name: 'login' })
      }
    }
}
</script>

<style>
  .link{
    text-decoration: none;
  }
</style>