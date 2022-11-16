import { createRouter, createWebHistory} from 'vue-router'
import ViewPokemon from '../views/ViewPokemon.vue'
import Main from '../views/MainPokemon.vue'
import Home from '../views/LandingPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/pokemon',
        name: 'Main',
        component: Main
    },
    {
        path: '/pokemon/:name',
        name: 'Pokemon',
        component: ViewPokemon,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router