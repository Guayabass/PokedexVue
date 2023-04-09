<template>
  <main id="PokemonApp">
    <button v-if="authStore.isLoggedIn" @click="logOut"><i class="fa-solid fa-right-from-bracket"></i>Sign Out</button>
    <!-- <router-link to="/pokemon/test">pokemon</router-link>  -->
    <router-view />
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../src/stores/authStore';
import { getAuth, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth';
// import PokemonSearch from './components/PokemonSearch.vue';
// import Pokemon from './components/Pokemon.vue';
// import NavBar from './components/NavBar.vue';
// import CustomIVsModal from './components/customIVsModal.vue';
// import CustomEVsModal from './components/customEVsModal.vue';
// import CustomNatureModal from './components/customNatureModal.vue';
// const pokemonStore = usePokemonStore();
const authStore = useAuthStore();
const router = useRouter();

let auth;
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      authStore.isLoggedIn = true;
    } else {
      authStore.isLoggedIn = false;
    }
  })

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

const logOut = () => {
  signOut(auth).then(() => {
    router.push("/home")
    authStore.isLoggedIn = false;
    authStore.username = "none";
    authStore.password = "none";
    authStore.favorites = [];
    authStore.userId = 0;
  })
};


</script>


<style scoped>
/** applies only to this component because of scoped */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#PokemonApp {
  width: 80%;
  height: 100vh;
  background-color: white;
  margin: 0 auto;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 800ms ease;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 800ms ease;
}

@media only screen and (max-width: 768px) {
  #PokemonApp {
    width: 100%;
  }
}
</style>
