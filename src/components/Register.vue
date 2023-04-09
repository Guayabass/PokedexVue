<template>
    <section class="register">
        <div class="register-form">
            <h2>Register</h2>
            <input type="email" placeholder="Email Address" v-model="user.username">
            <input type="password" placeholder="Password" v-model="user.password">
            <button @click="register">Register</button>
        </div>
    </section>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
import axios from 'axios';
import { localhostApi } from '../exports/nestapi.js';
import { useAuthStore } from '../stores/authStore';

const user = {
    username: '',
    password: '',
}
const router = useRouter();
const auth = getAuth();
const authStore = useAuthStore()

const register = () => {

    createUserWithEmailAndPassword(auth, user.username, user.password)
        .then((data) => {
            //console.log('successfully registered')
            if (auth.currentUser) {
                console.log('logged in')
                authStore.isLoggedIn = true;
                registerDB();
            } else {
                console.log('not logged')
            }
        })
        .catch((error) => {
            console.log(error.code)
            alert(error.message)
        });
};

const registerDB = async () => {
    await axios.post(localhostApi + 'authuser/create', user).then(response => {
        //console.log(response.data);
        authStore.setUserId(response.data.id);
        authStore.username = user.username;
        authStore.password = user.password;
        router.push('/pokemon/favorites')
    })
        .catch((error) => {
            console.log('error in registerDB')
            console.log(error.code)
        });
};

</script>

<style></style>