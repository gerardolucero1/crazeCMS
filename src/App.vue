<template>
    <v-app id="app">
        <!-- Sidebar -->
        <v-navigation-drawer v-model="menu" app>
            <v-list-item v-if="usuario != null">
                <v-layout>
                    <v-flex xs5>
                        <v-avatar
                            size="48"
                            class="ma-2"
                        >
                            <img :src="usuario.fotoPerfil" alt="alt">
                        </v-avatar>
                    </v-flex>
                    <v-flex xs7>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ usuario.apellidos }} {{ usuario.nombres }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                APRIL
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-flex>
                </v-layout>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <slot v-if="usuario != null">

                <router-link :to="{ name: 'home' }" class="link">
                    <v-list-item>
                    <v-list-item-icon>
                        <v-icon>home</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Inicio</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </router-link>
                
                <router-link :to="{ name: 'profile' }" class="link">
                    <v-list-item>
                    <v-list-item-icon>
                        <v-icon>account_circle</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Perfil</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </router-link>
                    <slot v-if="usuario.tipo == 0">
                        <router-link :to="{ name: 'boutiques' }" class="link">
                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon>store</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>Boutiques</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link>

                        <!--router-link :to="{ name: 'clients' }" class="link">
                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon>person</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>Clientes</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link-->

                        <router-link :to="{ name: 'categorias' }" class="link">
                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon>loyalty</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>Categorias</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link>
                    </slot>
                    <slot v-if="usuario.tipo > 0">
                        <router-link :to="{ name: 'boutique', params: { id: usuario.boutique } }" class="link">
                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon>store</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>Boutique</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link>

                        <router-link :to="{ name: 'caja'}" class="link">
                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon>store</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>Caja</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link>
                    </slot>
                <v-list-item @click="salir">
                    <v-list-item-icon>
                    <v-icon>arrow_back</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>Salir</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item style="font-style:; color:#949494;">
                    <p>Plan actual: <strong>Plata</strong><br> <span>Mejorar Beneficios <i class="fa fa-arrow-alt-circle-up" style="color:green"></i></span></p>
                </v-list-item>
                </slot>

                <slot v-if="usuario == null">
                <router-link to="/" class="link">
                    <v-list-item>
                    <v-list-item-icon>
                        <v-icon>arrow_forward</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Ingresar</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </router-link>

                </slot>
            </v-list>
        </v-navigation-drawer>
        <!-- Termina sidebar-->

        <v-app-bar app color="primary accent-4" dark>
            <v-app-bar-nav-icon @click="menu = !menu"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <v-img class="img-logo" src="https://i.imgur.com/DPvXcTX.png"></v-img>
            </v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container fluid fill-height style="padding: 0;">
                <v-slide-y-transition mode="out-in">
                    <router-view></router-view>
                </v-slide-y-transition>
            </v-container>
        </v-content>

        <v-snackbar
            v-model="notificacion.visible"
            :color="notificacion.color"
            multi-line
            top
            :timeout="6000"
            dark
            >
            {{ notificacion.mensaje }}
            <v-btn text color="white" @click.native="ocultarNotificacion">cerrar</v-btn>
        </v-snackbar>

        <v-dialog
            v-model="ocupado.visible"
            persistent :overlay="false"
            max-width="400px"
            transition="dialog-transition"
            >
            <v-card>
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>
                        {{ ocupado.titulo }}
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text class="subheading">
                    {{ ocupado.mensaje }}
                </v-card-text>
                <v-card-text>
                    <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

        <Footer></Footer>
    </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'App',
    components: {
        Footer,
    },
    data(){
        return{
            menu: false,
        }
    },
    computed: {
        ...mapState([
            'notificacion',
            'ocupado',
        ]),

        ...mapState(
            'sesion', ['usuario']
        )
    },
    methods: {
        ...mapMutations([
            'ocultarNotificacion',
        ]),

        ...mapActions(
            'sesion', ['cerrarSesion']
        ),

        salir: function(){
            this.cerrarSesion()
            this.menu = false
            this.$router.push({ name: 'login' })
        }
    }
}
</script>

<style>
    .img-logo{
        width: 115px;
    }
</style>
