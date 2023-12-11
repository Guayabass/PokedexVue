<template>
  <div class="register-form-wrapper">
    <div class="register-form">
      <h2><span class="blue">Register</span></h2>
      <div class="form">
        <input data-cy="register-user" placeholder="Email" type="text" name="Register" required v-model="user.username">
        <label for="Register" class="label-name">
          <span class="content-pokemon">Username</span>
        </label>
      </div>
      <div class="form">
        <input data-cy="register-pass" placeholder="Password" type="password" name="Register" required
          v-model="user.password">
        <label for="Register" class="label-name">
          <span class="content-pokemon">Password</span>
        </label>
      </div>
      <p class="register-text">Already registered? </p><span class="blue" @click="redirectLogin()">Log in</span>
    </div>
    <div class="btn-wrapper">
      <button data-cy="register-btn" class="register-button" @click="register">Register</button>
    </div>
  </div>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API } from '../exports/nestapi.js';
import { useAuthStore } from '@/modules/favorites/store/authStore'

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
  await axios.post(API + 'authuser/create', user).then(response => {
    console.log(response.status);
    authStore.setUserId(response.data.id);
    authStore.username = user.username;
    authStore.password = user.password;
    authStore.isLoggedIn = true;
    router.push('/pokemon/favorites')
  })
    .catch((error) => {
      console.log('error in registerDB')
      console.log(error.code)
    });
};

const redirectLogin = () => {
  authStore.registerOrLogin = !authStore.registerOrLogin
  router.push('/login')
};

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap");

* {
  font-family: "Lato", sans-serif;
}

.register-form-wrapper {
  height: 80%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: 4px solid rgb(55, 176, 251);
  border-right: 4px solid rgb(55, 176, 251);
}

.register-form {
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.register-button {
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

.register-button:hover {
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

@media (max-width: 1000px) {
  .register-form-wrapper {
    width: 60%;
  }
}

@media (max-width: 570px) {
  .register-form-wrapper {
    width: 80%;
    margin-top: 24px;
  }

  h2 .blue {
    font-size: 18px;
  }

  .register-form {
    height: 80%;
  }

  .btn-wrapper {
    height: 
    20%;
  }

  .register-button {
    font-size: 14px;
    height: 35px;
  }

  .register-text {
    font-size: 14px;
  }

  .blue {
    font-size: 14px;
  }
}
</style>