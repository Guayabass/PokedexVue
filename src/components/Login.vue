<template>
    <section class="login">
        <div class="login-form">
            <h2>Login</h2>
            <input type="email" placeholder="Email Address" v-model="user.username">
            <input type="password" placeholder="Password" v-model="user.password">
            <button @click="login">Login</button>
        </div>
        <p class="error-msg" v-if="errMsg">{{ errMsg }}</p>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
import axios from 'axios';
import { localhostApi } from '../exports/nestapi.js';
import { useAuthStore } from '../stores/authStore';

const user = {
    username: '',
    password: '',
}
const router = useRouter();
const errMsg = ref();
const auth = getAuth();
const authStore = useAuthStore()

const login = () => {

    signInWithEmailAndPassword(auth, user.username, user.password)
        .then((data) => {
            console.log('successfully signed in')
            //console.log(auth.currentUser)
            loginDB();
        })
        .catch((error) => {
            console.log(error.code)
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid Email"
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account was found with that email"
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Wrong password"
                    break;
                default:
                    errMsg.value = "Wrong email or password"
                    break;
            }
        });
};

const loginDB = async () => {
    await axios.post(localhostApi + 'authuser/login', user).then(response => {
        authStore.setUserId(response.data.id);
        authStore.username = user.username;
        authStore.password = user.password;
        router.push('/pokemon/favorites')
        //console.log(authStore.userId);
        console.log('exists in DB (logged in as well)')
    })
        .catch((error) => {
            console.log('error in loginDB')
            console.log(error.code)
        });
};
</script>

<style>

</style>