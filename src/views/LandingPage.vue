<template>
    <nav-bar-landing-page></nav-bar-landing-page>
    <section class="auth-section">
        <Transition name="fade" mode="out-in">
            <Login v-if="!authStore.registerOrLogin"></Login>
            <Register v-else-if="authStore.registerOrLogin"></Register>
        </Transition>
    </section>
    <router-link :to="{ name: 'Main' }">Pokemon</router-link>
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

</style>
