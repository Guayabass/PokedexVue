<template>
  <main id="PokemonApp">
    <!-- <button class="sign-out-button" v-if="authStore.isLoggedIn" @click="logOut"><i
        class="fa-solid fa-right-from-bracket"></i> Sign Out</button> -->
    <!-- <router-link to="/pokemon/test">pokemon</router-link>  -->
    <router-view />
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../src/stores/authStore';
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';
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

.sign-out-button {
  display: inline-block;
  position: fixed;
  bottom: 0px;
  right: 0px;
  outline: 0;
  cursor: pointer;
  border: none;
  padding: 0 26px;
  height: 45px;
  line-height: 45px;
  border-radius: 7px;
  background-color: #0070f3;
  color: white;
  font-weight: 400;
  font-size: 16px;
  box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
  transition: 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.sign-out-button:hover {
  background: rgba(0, 118, 255, 0.9);
  box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
}

@media only screen and (max-width: 768px) {
  #PokemonApp {
    width: 100%;
  }
  .sign-out-button{
    display: none;
  }
}
</style>
