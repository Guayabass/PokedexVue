

<script>
import { pokeapi } from '@/api/pokeapi'
import { usePokemonStore } from '../stores/pokemonStore.js';

//const pokeapi = 'https://pokeapi.co/api/v2/pokemon'
export default {
    name: 'PokemonSearch',
    data() {
        return {
            pokemonID: '',
        }
    },
    methods: {
        async searchPokemon() {
            try {
                const pokemonToFind = await fetch(`${pokeapi}/${this.pokemonID}`)//aggara el pokemon con el id
                const pokemon = await pokemonToFind.json()
                //console.log(pokemon)
                this.addPokemon(pokemon, this.pokemonID)
                return pokemon
            } catch (error) {
                alert('Pokemon was not found :(')
                console.log(error)
            }
        },
        addPokemon(pokemon, id) {
            
            const pokemonStore = usePokemonStore()
            pokemonStore.pokemonData = pokemon
            pokemonStore.pokemonID = id
            //console.log(pokemonStore.pokemonData)
            //console.log(pokemonStore.pokemonID)
        }
    }
}



</script>

<template>
    <header class="header">
        <label for="search">
            Enter ID:
            <input type="text" id="search" v-model="pokemonID">
            <!--v-model para pasar el pokemonID-->
            <button @click="searchPokemon">Search pokemon</button>
        </label>
    </header>
</template>
