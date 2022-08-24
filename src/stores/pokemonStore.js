import { defineStore } from 'pinia'

export const usePokemonStore = defineStore({
  id: 'Pokemons',
  state: () => ({
    pokemonData: {},
    pokemonID: 0,
  }),
  /**getters: {
    doubleCount: (state) => state.counter * 2
  },**/
  actions: {
    changeImage() {
      //pokemonStore.pokemonSprite = 'src/assets/pokemon/shiny/' + pokemonStore.pokemonID + '.png'
      //console.log(pokemonStore.pokemonSprite)
    }
  }
})
