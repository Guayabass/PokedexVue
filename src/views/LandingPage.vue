<template>
    <section class="landing-page">
        <nav-bar-landing-page></nav-bar-landing-page>
        <div class="title-section">
            <span class="landing-title">WebDex</span>
            <h2 class="landing-subtitle">The <span class="blue">online</span> Pokedex!
                <span class="blue">Login</span> to access/add your <span class="blue">Favorite</span> pokemon or <span
                    class="blue">Register</span> to start now!
            </h2>
        </div>
        <div class="auth-section">
            <Transition name="fade" mode="out-in">
                <Login v-if="!authStore.registerOrLogin"></Login>
                <Register v-else-if="authStore.registerOrLogin"></Register>
            </Transition>
        </div>
    </section>
    <!-- <router-link :to="{ name: 'Main' }">Pokemon</router-link> -->
</template>

<script>
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import NavBarLandingPage from '../components/NavBarLandingPage.vue'
import { useAuthStore } from '@/stores/authStore.js';

export default {
    components: { NavBarLandingPage, Login, Register },
    setup() {
        const authStore = useAuthStore()

        return { authStore }
    }
}
</script>

<style>
.landing-page{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.landing-page .title-section{
    justify-content: center;
}
.auth-section {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 35%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 30%;
    width: 100%;
}

.landing-title {
    font-family: 'Pokemon Solid', sans-serif;
    color: #207fb6;
    font-size: 70px;
    margin: 0;
    transition: .5s;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.landing-title:hover {
    color: #3fb0f1;
    transform: scale(1.1);
}

.landing-subtitle {
    height: 25%;
    text-align: center;
    width: 80%;
    line-height: 40px;
}
</style>
