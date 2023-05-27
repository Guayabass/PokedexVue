<template>
  <router-link :to="{ name: 'Home' }">
    <NavBar></NavBar>
  </router-link>
  <Suspense>
    <template #default>
      <div v-if="authStore.favorites.length > 0" class="fav-container">
        <div class="favs" v-for="(fav, key) in authStore.favorites" :key="key">
          <FavoritePokemonSprite :name="fav.name" :id="fav.id" />
        </div>
      </div>
      <div v-else class="fav-container">
        <div class="sub-title-wrapper">
          <h2 class="sub-title">You currently have no <span @click="pustToPokemon()" class="blue">favorites!</span>
            Click<span @click="pustToPokemon()" class="blue"> here</span> to be able to lookup your favorite pokemon and
            <span @click="pustToPokemon()" class="blue">favorite/share</span> them!
          </h2>
        </div>
      </div>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import axios from 'axios';
import { localhostApi } from '../exports/nestapi.js';
import { useRouter } from 'vue-router';
import NavBar from '../components/NavBar.vue'
import FavoritePokemonSprite from '../components/FavoritePokemonSprite.vue'
export default {
  name: 'FavoritePokemon',
  setup() {
    const authStore = useAuthStore()

    const router = useRouter()

    return { authStore, router }
  },
  async mounted() {
    if (this.authStore.isLoggedIn) {
      await axios.get(localhostApi + 'favorites/' + this.authStore.userId).then(response => {
        response.data.forEach(element => {
          if (this.authStore.favorites.find(e => e.id === element.pokemonID)) {
            console.log('Duplicate ID, not adding to array.')
          } else {
            const pokemon = {
              id: 0,
              name: "",
            }
            pokemon.id = element.pokemonID,
              pokemon.name = element.pokemonName,

              this.authStore.favorites.push(pokemon);
            this.authStore.favoriteIDs.push(element.pokemonID)
          }
        });
        //console.log(this.authStore.favorites)
      })
        .catch((error) => {
          console.log('error in favorites')
          console.log(error.code)
        });
    } else {
      console.log('not logged (fav page)')
    }
  },
  data() {
    return {
      loaded: false
    }
  },
  methods: {
    pustToPokemon() {
      this.router.push('/pokemon/');
    }
  },
  components: { NavBar, FavoritePokemonSprite },
};
</script>

<style>
.fav-container {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.favs{
  width: 33%;
}
</style>