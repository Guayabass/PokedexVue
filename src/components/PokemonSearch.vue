<script>
import { pokeapi } from '@/api/pokeapi'
import { usePokemonStore } from '../stores/pokemonStore.js';

//const pokeapi = 'https://pokeapi.co/api/v2/pokemon'
export default {
    name: 'PokemonSearch',
    data() {
        return {
            pokemonID: '',
            pokeData: {}
        }
    },
    methods: {
        async searchPokemon() {
            try {
                const pokemonToFind = await fetch(`${pokeapi}/${this.pokemonID}`)//aggara el pokemon con el id
                const pokemon = await pokemonToFind.json()
                this.pokeData = pokemon
                console.log(pokemon)
                this.addPokemon(pokemon)
                return pokemon
            } catch (error) {
                alert('Pokemon was not found :(')
                console.log(error)
            }
        },
        async addPokemon(pokemon) {
            const pokemonStore = usePokemonStore()
            this.pokemonStore.pokemonData = pokemon
            console.log(pokemonStore.pokemonData)
        }
    }
}



</script>

<template>
    <header class="header">
        <label for="search">
            Enter pokemon name or ID:
            <input type="text" id="search" v-model="pokemonID">
            <!--v-model para pasar el pokemonID-->
            <button @click="searchPokemon">Search pokemon</button>
        </label>
    </header>
</template>