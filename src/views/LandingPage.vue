<template>
    <section class="landing-page">
        <nav-bar-landing-page></nav-bar-landing-page>
        <div class="title-section">
            <span class="landing-title">WebDex</span>
            <figure>
                <img src="../assets/images/pikachu.png">
            </figure>
            <h2 class="landing-subtitle">The <span class="blue">online</span> Pokedex!
                <span class="blue">Login</span> to access/add your <span class="blue">Favorite</span> pokemon or <span
                    class="blue">Register</span> to start now!
            </h2>
        </div>
        <div class="auth-section">
            <router-view v-slot="{ Component }">
                <Transition name="page-fade" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </router-view>
            <!-- <Transition name="fade" mode="out-in">
                <Login v-if="!authStore.registerOrLogin"></Login>
                <Register v-else-if="authStore.registerOrLogin"></Register>
            </Transition> -->
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
.landing-page {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.landing-page .title-section {
    justify-content: center;
}

.auth-section {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 60%;
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
    height: 40%;
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

.page-fade-enter-active, .page-fade-leave-active {
    transition: opacity 800ms ease;
}

.page-fade-enter-to, .page-fade-leave-from{
    opacity: 1;
}

.page-fade-enter-from, .page-fade-leave-to{
    opacity: 0;
}
@media (max-width: 500px) {
    .landing-subtitle{
        font-size: 16px;
        margin: 24px 0;
        line-height: 24px;
    }
}

@media (max-width: 750px) and (min-width: 500px) {
    .landing-subtitle{
        font-size: 20px;
        margin: 24px 0;
        line-height: 24px;
    }
}
</style>