<template>
    <v-layout class="bg-login" justify-center align-center>
        <v-flex xs12 sm8 md6 lg3 xl4>
            <v-card class="elevation-6 card-login">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>
                        Ingresa tus credenciales
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text class="subheading text-center">
                    Ingresa con tu red social preferida
                </v-card-text>
                <v-card-text>
                    <v-layout justify-center>
                        <a @click="ingresar('facebook')">
                            <v-avatar
                                tile
                                size="48"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="ingreso facebook">
                            </v-avatar>
                        </a>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="text-center">
                    Ingresa con un cuenta de email y contraseña
                </v-card-text>
                <v-card-text>
                    <v-text-field
                        name="email"
                        label="email"
                        id="email"
                        autofocus
                        v-model="formulario.email"
                        :error-messages="erroresEmail"
                        @blur="$v.formulario.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                        name="password"
                        label="password"
                        id="password"
                        type="password"
                        v-model="formulario.password"
                        :error-messages="erroresPassword"
                        @blur="$v.formulario.password.$touch()"
                        @keyup.enter="ingresar('email')"
                    ></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-layout justify-end>
                        <v-btn @click="ingresar('email')" :disabled="$v.formulario.$invalid" color="secondary">Ingresar</v-btn>
                    </v-layout>
                </v-card-text>
            </v-card>  
        </v-flex>
    </v-layout>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapMutations, mapGetters } from 'vuex'
import { auth, firebase } from '@/firebase'

export default {
    name: 'login',
    data(){
        return{
            formulario: {
                email: '',
                password: '',
            }
        }
    },
    validations: {
        formulario: {
            email: {
            required,
            email,
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20),
            }
        }
    },
    computed: {
        ...mapGetters(
            'sesion', ['saludo']
        ),

        erroresEmail: function(){
            let errores = []
            if(!this.$v.formulario.email.$dirty){
                return errores
            }

            if(!this.$v.formulario.email.required){
                errores.push('Ingresa tu email')
            }

            if(!this.$v.formulario.email.email){
                errores.push('Ingresa un email valido')
            }

            return errores
        },

        erroresPassword: function(){
            let errores = []
            if(!this.$v.formulario.password.$dirty){
                return errores
            }

            if(!this.$v.formulario.password.required){
                errores.push('Ingresa tu password')
            }

            if(!this.$v.formulario.password.minLength){
                errores.push('Ingresa un password de minimo 6 caracteres')
            }

            if(!this.$v.formulario.password.maxLength){
                errores.push('Ingresa un password de maximo 20 caracteres')
            }

            return errores
        }
    },
    methods: {
        ...mapMutations([
            'mostrarOcupado',
            'ocultarOcupado',
            'mostrarExito',
            'mostrarAdvertencia',
            'mostrarError'
        ]),

        ...mapMutations(
            'sesion', ['actualizarUsuario']
        ),

        ingresar(metodo){
            switch (metodo) {
                case 'email':
                    this.ingresarEmail()
                    break;
                case 'facebook':
                    this.ingresarFacebook()
                default:
                    break;
            }
        },

        async ingresarFacebook(){
            let provider = new firebase.auth.FacebookAuthProvider()
            provider.setCustomParameters({
                'display': 'popup'
            })

            auth.languageCode = 'es_MX'

            try{
                await auth.signInWithPopup(provider)
                this.mostrarExito(this.saludo)

                this.$router.push({ name: 'home' })
            }
            catch(error){
                console.log(error)
                this.mostrarError('Ocurrio un error validando tu cuenta')
            }
        },

        async ingresarEmail(){
            if(this.$v.formulario.$invalid){
                this.$v.formulario.$touch()
                return
            }

            let ocupado = {
                titulo: 'Validando',
                mensaje: 'Estamos validando tu informacion...',

            }

            this.mostrarOcupado(ocupado)

            try{
                await auth.signInWithEmailAndPassword(this.formulario.email, this.formulario.password)

            }
            catch(error){
                console.log(error)
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        this.mostrarAdvertencia('Revisa tu email y contraseña')
                        break;
                
                    default:
                        this.mostrarError('Ocurrio un error al validar la informacion')
                        break;
                }
            }
            finally{
                this.ocultarOcupado()
            }
        }
    }
}
</script>

<style>
    .bg-login{
        background-image: linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
        ), url('https://i.imgur.com/yK6TcpR.jpg');
        background-size: cover;
    }

    .card-login{
        opacity: 0.9;
    }
</style>