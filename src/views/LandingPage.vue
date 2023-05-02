<template>
    <NavBar></NavBar>
    <Transition name="fade" mode="out-in">
        <Login v-if="!authStore.registerOrLogin"></Login>
        <Register v-else-if="authStore.registerOrLogin"></Register>
    </Transition>
    <router-link :to="{ name: 'Main' }">Pokemon</router-link>
</template>

<script>
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import NavBar from '../components/NavBar.vue'
import { useAuthStore } from '@/stores/authStore.js';

export default {
    components: { NavBar, Login, Register },
    setup(){
        const authStore = useAuthStore()

        return {authStore}
    }
}
</script>
