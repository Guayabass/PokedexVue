<template>
  <router-link :to="{ name: 'Home' }">
    <NavBar />
  </router-link>
  <Suspense>
    <template #default>
      <div
        v-if="authStore.favorites.length > 0"
        class="fav-container"
      >
        <div
          v-for="(fav, key) in authStore.favorites"
          :key="key"
          class="favs"
        >
          <FavoritePokemonSprite
            :id="fav.id"
            :name="fav.name"
          />
        </div>
      </div>
      <div
        v-else
        class="fav-container"
      >
        <div class="sub-title-wrapper">
          <h2 class="sub-title">
            You currently have no <span
              class="blue"
              @click="pustToPokemon()"
            >favorites!</span>
            Click<span
              class="blue"
              @click="pustToPokemon()"
            > here</span> to be able to lookup your favorite pokemon and
            <span
              class="blue"
              @click="pustToPokemon()"
            >favorite/share</span> them!
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
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import { API } from '@/exports/nestapi.js';
import { useRouter } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import FavoritePokemonSprite from '../components/FavoritePokemonSprite.vue'
export default {
  name: 'FavoritePokemon',
  components: { NavBar, FavoritePokemonSprite },
  setup() {
    const authStore = useAuthStore()

    const router = useRouter()

    return { authStore, router }
  },
  data() {
    return {
      loaded: false
    }
  },
  async mounted() {
    if (this.authStore.isLoggedIn) {
      await axios.get(API + 'favorites/' + this.authStore.userId).then(response => {
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
  methods: {
    pustToPokemon() {
      this.router.push('/pokemon/');
    }
  },
};
</script>

<style>
.fav-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.favs{
  width: 33%;
}

@media (max-width: 1500px) {
    .favs{
      width: 50%;
    }
  }
@media (max-width: 920px) {
    .favs{
      width: 100%;
    }
}

@media (max-width: 450px) {
    .favs{
      width: 100%;
      margin: 8px;
    }
}

</style>