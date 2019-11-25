import Vue from 'vue'
import Vuex from 'vuex'

import sesion from './sesion'
import boutique from './boutique'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notificacion: {
            visible: false,
            mensaje: '',
            color: 'info',
        },
        ocupado: {
            visible: false,
            titulo: '',
            mensaje: '',
        },
    },
    mutations: {
        mostrarInformacion: function(state, payload) {
            state.notificacion.mensaje = payload
            state.notificacion.color = 'info'
            state.notificacion.visible = true
        },

        mostrarExito: function(state, payload) {
            state.notificacion.mensaje = payload
            state.notificacion.color = 'success'
            state.notificacion.visible = true
        },

        mostrarAdvertencia: function(state, payload) {
            state.notificacion.mensaje = payload
            state.notificacion.color = 'warning'
            state.notificacion.visible = true
        },

        mostrarError: function(state, payload) {
            state.notificacion.mensaje = payload
            state.notificacion.color = 'error'
            state.notificacion.visible = true
        },

        ocultarNotificacion: function(state) {
            state.notificacion.visible = false
        },

        mostrarOcupado: function(state, payload) {
            state.ocupado.titulo = payload.titulo
            state.ocupado.mensaje = payload.mensaje
            state.ocupado.visible = true
        },

        ocultarOcupado: function(state) {
            state.ocupado.visible = false
        },

    },
    actions: {

    },
    modules: {
        sesion,
        boutique
    },
    getters: {

    }
})