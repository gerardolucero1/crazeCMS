import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '@/firebase'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "register" */ '../views/user/Register.vue')
    },
    {
        path: '/verification-email',
        name: 'verificacion-email',
        component: () =>
            import ( /* webpackChunkName: "verificacion-email" */ '../views/user/VerificacionEmail.vue')
    },
    {
        path: '/',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/user/Login.vue')
    },
    {
        path: '/categorias',
        name: 'categorias',
        component: () =>
            import ( /* webpackChunkName: "categorias" */ '../views/categoria/Categorias.vue')
    },
    {
        path: '/boutiques',
        name: 'boutiques',
        component: () =>
            import ( /* webpackChunkName: "boutiques" */ '../views/boutique/Boutiques.vue')
    },
    {
        path: '/boutiques/:id',
        name: 'boutique',
        component: () =>
            import ( /* webpackChunkName: "boutique" */ '../views/boutique/Boutique.vue')
    },
    {
        path: '/clients',
        name: 'clients',
        component: () =>
            import ( /* webpackChunkName: "boutiques" */ '../views/clients/Clients.vue')
    },
    {
        path: '/user/profile',
        name: 'profile',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/user/Profile.vue'),
        meta: {
            autenticado: true,
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let user = auth.currentUser

    if (to.matched.some(record => record.meta.autenticado)) {
        if (user) {
            if (user.providerData[0].providerId == 'password' && !user.emailVerified) {
                next({ name: 'verificacion-email' })
            } else {
                next()
            }
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})

export default router