import { defineStore } from 'pinia'

export const usePokemonStore = defineStore({
  id: 'Pokemons',
  state: () => ({
    pokemonData: {},
    pokemonID: 0
  }),
  /**getters: {
    doubleCount: (state) => state.counter * 2
  },**/
  actions: {
    increment() {
      console.log('www')
    }
  }
})
