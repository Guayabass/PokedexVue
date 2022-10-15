import { defineStore } from "pinia";
import { pokeapi } from "../exports/pokeapi";

export const usePokemonStore = defineStore({
  id: "Pokemons",
  state: () => ({
    pokemonData: {},
    pokemonID: 0,
    customStats: false,
    showIVs: false,
    counterIV: 0,
    counterEV: 0,
    arrayIVs: [],
    arrayEVs: [],
  }),
  getters: {
    changePokemon: async (state) => {
      try {
        let pokemonToFind
        pokemonToFind = await fetch(`${pokeapi}/${state.pokemonID}`);
        state.pokemonData = await pokemonToFind.json()
      } catch (error) {
        alert("Pokemon was not found :(");
        console.log(error);
      }
    },
  },
  actions: {
    nextPokemon() {
      if (this.pokemonID >= 898){
        this.pokemonID = 1
      }
      this.pokemonID++;
      //pokemonStore.pokemonSprite = 'src/assets/pokemon/shiny/' + pokemonStore.pokemonID + '.png'
      //console.log(pokemonStore.pokemonSprite)
    },
    previousPokemon() {
      if (this.pokemonID <= 1){
        this.pokemonID = 898
      }
      this.pokemonID--;
    },
    setArrayIVs(array){
      this.arrayIVs = array
    }
  },
});
