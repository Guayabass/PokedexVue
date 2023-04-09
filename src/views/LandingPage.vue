<template>
    <NavBar></NavBar>
    <Login></Login>
    <Register></Register>
    <router-link :to="{name: 'Main'}">Pokemon</router-link>
</template>

<script>
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import NavBar from '../components/NavBar.vue'

export default {
    components: { NavBar, Login, Register }
}
</script>
