<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card v-if="vista == 1" class="elevation-6">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>
                        Registrate
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text class="subheading text-center">
                    Registrate con tu red social preferida
                </v-card-text>
                <v-card-text>
                    <v-layout justify-center>
                        <a @click="siguiente(1, 'facebook.com')">
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
                    Registrate con un cuenta de email y contraseña
                </v-card-text>
                <v-card-text>
                    <v-text-field
                        :error-messages="erroresEmail"
                        @blur="$v.formulario.email.$touch()"
                        name="email"
                        label="email"
                        id="email"
                        v-model="formulario.email"
                    ></v-text-field>

                    <v-text-field
                        :error-messages="erroresPassword"
                        @blur="$v.formulario.password.$touch()"
                        name="password"
                        label="password"
                        id="password"
                        :append-icon="showNormal ? 'visibility' : 'visibility_off'"
                        @click:append="() => (showNormal = !showNormal)"
                        :type="showNormal ? 'password' : 'text'"
                        v-model="formulario.password"
                    ></v-text-field>

                    <v-text-field
                        :error-messages="erroresRepetirPassword"
                        @blur="$v.formulario.repetirPassword.$touch()"
                        name="password"
                        label="Repetir password"
                        id="password"
                        :append-icon="showRepeat ? 'visibility' : 'visibility_off'"
                        @click:append="() => (showRepeat = !showRepeat)"
                        :type="showRepeat ? 'password' : 'text'"
                        v-model="formulario.repetirPassword"
                        @keyup.enter="siguiente(1, 'password')"
                    ></v-text-field>

                </v-card-text>
                <v-card-text>
                    <v-layout justify-end>
                        <v-btn :disabled="$v.formulario.$invalid" @click="siguiente(1, 'password')" color="secondary">Siguiente</v-btn>
                    </v-layout>
                </v-card-text>
            </v-card>
            <v-card v-if="vista == 2" class="elevation-6">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>
                        Ingresa tus nombres y apellidos
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                        :error-messages="erroresNombres"
                        @blur="$v.formulario_2.nombres.$touch()"
                        autofocus
                        name="name"
                        label="name"
                        id="name"
                        v-model="formulario_2.nombres"
                    ></v-text-field>

                    <v-text-field
                        :error-messages="erroresApellidos"
                        @blur="$v.formulario_2.apellidos.$touch()"
                        name="apellido"
                        label="apellido"
                        id="apellido"
                        @keyup.enter="siguiente(2)"
                        v-model="formulario_2.apellidos"
                    ></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-layout>
                        <v-flex xs6>
                            <v-layout justify-start>
                                <v-btn @click="vista--">Atras</v-btn>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-layout justify-end>
                                <v-btn :disabled="$v.formulario_2.$invalid" @click="siguiente(2, 'email')" color="secondary">Registrarse</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import { nombreCompuesto } from '@/utilities/validations'
import { auth, firebase, db } from '@/firebase'
import { mapMutations, mapGetters } from 'vuex'

export default {
    name: 'Register',
    data(){
        return{
            formulario: {
                email: '',
                password: '',
                repetirPassword: '',
            },
            formulario_2: {
                nombres: '',
                apellidos: '',
            },
            vista: 1,
            metodo: 'password',
            showNormal: String,
            showRepeat: String
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
            },
            repetirPassword: {
                sameAs: sameAs('password'),
                required,
            }
        },

        formulario_2: {
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
        },

        erroresRepetirPassword: function(){
            let errores = []
            if(!this.$v.formulario.repetirPassword.$dirty){
                return errores
            }

            if(!this.$v.formulario.repetirPassword.required){
                errores.push('Ingresa tu password')
            }

            if(!this.$v.formulario.repetirPassword.sameAs){
                errores.push('Las contraseñas no coinciden')
            }

            return errores
        },

        erroresNombres: function(){
            let errores = []
            if(!this.$v.formulario_2.nombres.$dirty){
                return errores
            }

            if(!this.$v.formulario_2.nombres.required){
                errores.push('Ingresa tu nombre')
            }

            if(!this.$v.formulario_2.nombres.minLength){
                errores.push('Ingresa un nombre de minimo 3 caracteres')
            }

            if(!this.$v.formulario_2.nombres.maxLength){
                errores.push('Ingresa un nombre de maximo 20 caracteres')
            }

            if(!this.$v.formulario_2.nombres.nombreCompuesto){
                errores.push('Ingresa un nombre valido')
            }

            return errores
        },

        erroresApellidos: function(){
            let errores = []
            if(!this.$v.formulario_2.apellidos.$dirty){
                return errores
            }

            if(!this.$v.formulario_2.apellidos.required){
                errores.push('Ingresa tus apellidos')
            }

            if(!this.$v.formulario_2.apellidos.minLength){
                errores.push('Ingresa un apellido de minimo 3 caracteres')
            }

            if(!this.$v.formulario_2.apellidos.maxLength){
                errores.push('Ingresa un apellido de maximo 20 caracteres')
            }

            if(!this.$v.formulario_2.apellidos.nombreCompuesto){
                errores.push('Ingresa un apellido valido')
            }

            return errores
        },
    },
    created(){
        if(auth.currentUser && !this.$store.state.sesion.usuario){
            this.metodo = auth.currentUser.providerData[0].providerId
            this.vista = 2
            this.$store.commit('mostrarInformacion', 'Completa tus datos de registro')
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

        ...mapMutations(
            'sesion', ['actualizarUsuario']
        ),

        siguiente: function(vista, metodo){
            switch (vista) {
                case 1:
                    if(this.$v.formulario.$invalid && metodo == 'password'){
                        this.$v.formulario.$touch()
                        return
                    }else{
                        this.metodo = metodo
                        this.vista++
                    }
                    break;
                case 2:
                    if(this.$v.formulario_2.$invalid){
                        this.$v.formulario_2.$touch()
                        return
                    }else{
                        this.registrarse()
                    }
                    break;

                default:
                    break;
            }
        },

        async registrarse(){
            console.log(this.metodo)
            switch (this.metodo) {
                case 'password':
                    this.registrarEmail()
                    break;
                case 'facebook.com':
                    this.registrarFacebook()
                default:
                    break;
            }
        },

        async guardarUsuario(uid){
            let usuario = {
                    uid,
                    userName: 'Chaewon',
                    nombres: this.formulario_2.nombres,
                    apellidos: this.formulario_2.apellidos,
                    //fechaNacimiento: new Date(this.fechaNacimiento),
                    sexo: 'Femenino',
                    descripcion: 'Descripcion',
                    biografia: 'https://drama.fandom.com/es/wiki/Lee_Jin_Sol',
                    fotoPerfil: 'https://hallyumusic.com/wp-content/uploads/2018/01/APRIL-Chaewon-The-Ruby-Cover.jpg'
                }

                await db.collection('usuarios')
                    .doc(usuario.uid)
                    .set(usuario)

                this.actualizarUsuario(usuario)
                this.mostrarExito(this.saludo)
        },

        async registrarEmail(){
            try{
                this.mostrarOcupado({ titulo: 'Creando registro', mensaje: 'Estamos registrando tus datos' })

                let uid = null

                if(auth.currentUser){
                    uid = auth.currentUser.uid
                }else{
                    let credencial = await auth.createUserWithEmailAndPassword(this.formulario.email, this.formulario.password)
                    uid = credencial.user.uid
                }

                await this.guardarUsuario(uid)

                await auth.currentUser.sendEmailVerification()

                this.$router.push({ name: 'verificacion-email' })
            }
            catch(error){
                console.log(error)
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        this.mostrarAdvertencia('Ya se ha registrado esta direccion de email')
                        break;

                    default:
                        this.mostrarError('Ocurrio un error registrando tu cuenta')
                        break;
                }
            }
            finally{
                this.ocultarOcupado()
            }
        },

        async registrarFacebook(){
            let provider = new firebase.auth.FacebookAuthProvider()
            provider.setCustomParameters({
                'display': 'popup'
            })

            auth.languageCode = 'es_MX'

            try{
                let uid = null

                if(auth.currentUser){
                    uid = auth.currentUser.uid
                }else{
                    let credenciales = await auth.signInWithPopup(provider)
                    uid = credenciales.user.uid
                }

                await this.guardarUsuario(uid)

                this.$router.push({ name: 'home' })
            }
            catch(error){
                console.log(error)
                this.mostrarError('Ocurrio un error registrando tu cuenta')
            }
        }
    }
}
</script>

<style>

</style>
