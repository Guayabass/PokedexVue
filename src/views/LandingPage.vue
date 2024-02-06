<template>
  <section class="landing-page">
    <nav-bar-landing-page />
    <div class="title-section">
      <span class="landing-title">WebDex</span>
      <figure>
        <img src="../assets/images/pikachu.png">
      </figure>
      <h2 class="landing-subtitle">
        The <span class="blue">online</span> Pokedex!
        <span class="blue">Login</span> to access/add your <span class="blue">Favorite</span> pokemon or <span
          class="blue"
        >Register</span> to start now!
      </h2><!--change when logged in-->
    </div>
    <Transition
      name="page-fade"
      mode="out-in"
    >
      <div
        v-if="!authStore.isLoggedIn"
        class="auth-section"
      >
        <router-view v-slot="{ Component }">
          <Transition
            name="page-fade"
            mode="out-in"
          >
            <component :is="Component" />
          </Transition>
        </router-view>
        <!-- <Transition name="fade" mode="out-in">
                <Login v-if="!authStore.registerOrLogin"></Login>
                <Register v-else-if="authStore.registerOrLogin"></Register>
            </Transition> -->
      </div>
      <div
        v-else
        class="logged-section"
      >
        <h2>Welcome back!</h2>
        <span class="wave">👋</span>
        <h2>
          Go to <span
            class="blue"
            @click="toFavorites()"
          >Favorites</span>
        </h2>
      </div>
    </Transition>
  </section>
  <!-- <router-link :to="{ name: 'Main' }">Pokemon</router-link> -->
</template>

<script>
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import NavBarLandingPage from '../components/NavBarLandingPage.vue'
import { useAuthStore } from '@/modules/favorites/store/authStore'
import { useRouter } from 'vue-router';

export default {
    components: { NavBarLandingPage, Login, Register },
    setup() {
        const authStore = useAuthStore()

        const router = useRouter()

        return { authStore, router }
    },
    methods: {
        toFavorites() {
            this.router.push('/pokemon/favorites')
        }
    },
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

.logged-section {
    height: 60%;
    margin-top: 48px;
    width: 100%;
    line-height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.logged-section .blue {
    cursor: pointer;
}

.page-fade-enter-active,
.page-fade-leave-active {
    transition: opacity 800ms ease;
}

.page-fade-enter-to,
.page-fade-leave-from {
    opacity: 1;
}

.page-fade-enter-from,
.page-fade-leave-to {
    opacity: 0;
}

.wave {
    display: inline-block;
    /*span por default tiene display: inline que no permite rotar*/
    font-size: 24px;
    animation: animate-wave 500ms infinite ease-in-out;
    /*el ease-in-out lo hace un poco mas smooth*/
}

@keyframes animate-wave {
    0% {
        transform: rotate(0);
    }

    50% {
        transform: rotate(30deg);
    }

    100% {
        transform: rotate(0);
    }
}

@media (max-width: 500px) {
    .landing-title{
        font-size: 36px;
        margin-top: 24px;
    }
    .landing-subtitle {
        font-size: 16px;
        margin-top: 24px;
        line-height: 24px;
    }
    .landing-subtitle span{
        font-size: 16px;
        line-height: 24px;
    }
    .logged-section{
        font-size: 16px;
    }
}

@media (max-width: 750px) and (min-width: 500px) {
    .landing-subtitle {
        font-size: 16px;
        line-height: 24px;
    }
    .logged-section{
        font-size: 20px;
    }
}

@media (max-height: 800px) {
    .landing-title{
        font-size: 36px;
        margin-top: 24px;
    }
    .title-section img{
        width: 100%;
        height: 70%;
    }
    .landing-subtitle{
        margin: 0;
    }
    .landing-subtitle {
        font-size: 16px;
        line-height: 24px;
    }
    .logged-section{
        font-size: 20px;
    }
}
</style>