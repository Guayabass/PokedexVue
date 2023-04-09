<template>
  <NavBar></NavBar>
  <div class="fav-container">
    <div class="favs" v-for="(fav, index, key) in authStore.favorites" :key="key">
      <img class="fav-sprite" :src="loadSprite(fav.id)" :alt="fav" />
      <h2>{{ fav.name }}</h2>
      <p>{{ index }}</p>
      <p>{{ fav.id }}</p>
      <button @click="authStore.deleteFavorite(fav.id, index)" >delete</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import axios from 'axios';
import { localhostApi } from '../exports/nestapi.js';
import NavBar from '../components/NavBar.vue'
export default {
  name: 'FavoritePokemon',
  setup() {
    const authStore = useAuthStore()

    return { authStore }
  },
  async mounted() {
    if (this.authStore.isLoggedIn) {
      await axios.get(localhostApi + 'favorites/' + this.authStore.userId).then(response => { //PASS THE USERID AS PROPS INSTEAD
        response.data.forEach(element => {
          if (this.authStore.favorites.find( e => e.id === element.pokemonID )) { 
            console.log('Duplicate ID, not adding to array.')
          } else {
            const pokemon = {
              id: 0,
              name: "",
            }
              pokemon.id = element.pokemonID,
              pokemon.name = element.pokemonName, 
            
            this.authStore.favorites.push(pokemon);
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
    loadSprite(id) {
      if (id > 649) {
        return "/src/assets/pokemon/" + id + ".png";
      }
      else {
        return "/src/assets/pokemon/versions/generation-v/black-white/animated/" + id + ".gif";
      }
      //return 'https://img.pokemondb.net/sprites/black-white/anim/normal/' + pokemonStore.pokemonData.name + '.gif'
    },
    async favPokemons(){

    }
  },
  components: { NavBar },
};
</script>

<style></style>