import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import { auth, db } from '@/firebase'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        usuario: null,
    },
    mutations: {
        actualizarUsuario: function(state, payload) {
            state.usuario = payload

        },
    },
    actions: {
        // Una accion recibe un context como parametro.
        // Un context puede utilizar todas las propiedades
        // tal como context.state, context.commit, sin embargo
        // lo habitual es pasar las propiedades a la funcion como
        // un objeto y usarlas directamente.
        cerrarSesion: function({ commit }) {
            auth.signOut()
            commit('actualizarUsuario', null)
        },

        async iniciarSesion({ commit, getters }, uid) {
            try {
                let document = await db.collection('usuarios').doc(uid).get()
                if (document.exists) {
                    let usuario = document.data()
                    commit('actualizarUsuario', usuario)

                    switch (router.currentRoute.name) {
                        case 'login':
                            commit('mostrarExito', getters.saludo, { root: true })
                            router.push({ name: 'home' })
                            break;

                        default:
                            break;
                    }

                } else {
                    router.push({ name: 'register' })
                }

            } catch (error) {
                commit('mostrarError', 'Ocurrio un error consultando tu informacion.', { root: true })
            }
        }
    },
    modules: {

    },
    getters: {
        saludo: function(state) {
            if (!state.usuario) {
                return ''
            }

            let vocal = state.usuario.sexo && state.usuario.sexo == 'Femenino' ? 'a' : 'o'
            return `¡Bienvenid${ vocal } ${ state.usuario.nombres }!`
        }
    }
}