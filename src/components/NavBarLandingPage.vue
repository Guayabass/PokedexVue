<template>
    <nav class="landing-nav">
        <figure class="figure-landing-page">
            <img src="../assets/images/pokedex.png" class="image-landing-page">
        </figure>
        <input type="checkbox" id="check">
        <label for="check" class="checkbtn">
            <i class="fa-solid fa-bars"></i>
        </label>
        <ul class="landing-ul">
            <li><a @click="loginChange()" :class="{ 'active': login }">Login</a></li>
            <li><a @click="registerChange()" :class="{ 'active': register }">Register</a></li>
            <li><a @click="webdexChange()" :class="{ 'active': webdex }">WebDex</a></li>
            <li><a @click="favoritesChange()" :class="{ 'active': favorites }">Favorites</a></li>
            <li v-if="authStore.isLoggedIn"><a @click="logoutChange()" :class="{ 'active': logout }">Sign Out</a></li>
        </ul>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { signOut, getAuth } from 'firebase/auth';
export default {
    name: 'NavBarLandingPage',
    setup() {
        const router = useRouter();
        const authStore = useAuthStore();
        return { router, authStore }
    },
    data() {
        return {
            login: true,
            register: false,
            webdex: false,
            favorites: false,
            logout: false,
        };
    },
    methods: {
        loginChange() {
            this.login = true
            this.register = false
            this.webdex = false
            this.favorites = false
            this.logout = false
            this.router.push('/login')
        },
        registerChange() {
            this.login = false
            this.register = true
            this.webdex = false
            this.favorites = false
            this.logout = false
            this.router.push('/register')
        },
        webdexChange() {
            this.login = false
            this.register = false
            this.webdex = true
            this.favorites = false
            this.logout = false
            this.router.push('/pokemon')
        },
        favoritesChange() {
            this.login = false
            this.register = false
            this.webdex = false
            this.favorites = true
            this.logout = false
            this.router.push('/pokemon/favorites')
        },
        logoutChange() {
            let auth;
            auth = getAuth()
            signOut(auth).then(() => {
                this.router.push("/home")
                this.authStore.isLoggedIn = false;
                this.authStore.username = "none";
                this.authStore.password = "none";
                this.authStore.favorites = [];
                this.authStore.favoriteIDs = [];
                this.authStore.userId = 0;
                this.authStore.registerOrLogin = false;
            })
            this.login = false
            this.register = false
            this.webdex = false
            this.favorites = false
            this.logout = true
        }
    }
}

</script>

<style>
.landing-nav {
    background: #24a1e9;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.figure-landing-page {
    display: flex;
    align-items: center;
    margin: 8px;
}

.image-landing-page {
    height: 64px;
    width: 64px;
}

.landing-ul {
    float: right;
    margin-right: 20px;
}

.landing-ul li {
    display: inline-block;
    line-height: 80px;
    margin: 0 10px;
}

.landing-ul li a {
    color: white;
    font-size: 17px;
    padding: 7px 13px;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: bold;
}

.image-landing-page:hover {
    transform: scale(1.1);
    transition: all 350ms ease;
}

.image-landing-page:not(:hover) {
    transform: scale(1);
    transition: all 350ms ease;
}

a.active,
a:hover {
    background: #047bd6;
    transition: .5s;
    cursor: pointer;
}

.checkbtn {
    font-size: 30px;
    color: white;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
}

#check {
    display: none;
}

@media (max-width: 952px) {

    /*remake yourself this doesnt work because of how the rest is done */
    nav .landing-ul li a {
        font-size: 16px;
    }
}

@media (max-width: 858px) {
    .landing-nav {
        display: flex;
        justify-content: space-between;
    }

    .checkbtn {
        display: block;
    }

    .landing-ul {
        position: fixed;
        width: 100%;
        height: 100vh;
        background: #2c3e50;
        top: 80px;
        z-index: 1000;
        left: -100%;
        text-align: center;
        transition: all .5s;
    }

    nav .landing-ul li {
        display: flex;
        flex-direction: column;
        margin: 50px 0;
        line-height: 30px;
    }

    nav .landing-ul li a {
        font-size: 20px;
    }

    .landing-ul a.active,
    .landing-ul a:hover {
        background: none;
        color: #0082e6;
    }

    #check:checked~.landing-ul {
        left: 0;
    }
}
</style>