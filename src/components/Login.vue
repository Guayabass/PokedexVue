<template>
    <div class="login-form-wrapper">
        <div class="login-form">
            <h2><span class="blue">Login</span></h2>
            <div class="form">
                <input placeholder="Email" type="text" name="Login" required v-model="user.username">
                <label for="Login" class="label-name">
                    <span class="content-pokemon">Username</span>
                </label>
            </div>
            <div class="form">
                <input placeholder="Password" type="password" name="Login" required v-model="user.password">
                <label for="Login" class="label-name">
                    <span class="content-pokemon">Password</span>
                </label>
            </div>
            <Transition name="fade" mode="out-in">
                <p class="error-msg" v-if="errMsg">{{ errMsg }}</p><!-- position right -->
            </Transition>
            <p class="login-text">Don't have an account? </p><span class="blue" @click="redirectRegister()">Register</span>
            <!-- make router link for clicking Log in -->
        </div>
        <div class="btn-wrapper">
            <button class="login-button" @click="login">Login</button>
        </div>
    </div>
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

const redirectRegister = () => {
    authStore.registerOrLogin = !authStore.registerOrLogin
    router.push('/register')
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap");

* {
    font-family: "Lato", sans-serif;
}

.login-form-wrapper {
    height: 80%;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 4px solid rgb(55, 176, 251);
    ;
    border-right: 4px solid rgb(55, 176, 251);
    ;
}

.login-form {
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.login-button {
    width: 30%;
    height: 50px;
    border: 1px solid;
    background: #2691d9;
    border-radius: 25px;
    font-size: 18px;
    color: #e9f4fb;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    transition: .5s;
}

.login-button:hover {
    background: #207fb6;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #207fb6,
        0 0 25px #207fb6,
        0 0 50px #207fb6
}

.btn-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40%;
    justify-content: center;
}

h2 .blue {
    cursor: default;
}

.error-msg {
    color: red;
}

@media (max-width: 1000px) {
    .login-form-wrapper {
        width: 60%;
    }
}

@media (max-width: 570px) {
    .login-form-wrapper {
        width: 80%;
    }
}
</style>