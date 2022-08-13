import { defineStore } from 'pinia'

export const usePokemonStore = defineStore({
  //id: 'counter',
  state: () => ({
    pokemonData: {}
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
