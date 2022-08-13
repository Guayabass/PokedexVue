<template>
    <header class="header">
        <label for="search">
            Enter pokemon name or ID:
            <input type="text" id="search" v-model="pokemonID"> <!--v-model para pasar el pokemonID-->
            <button @click="searchPokemon">Search pokemon</button>
        </label>
    </header>
</template>

<script>
import { pokeapi } from '@/api/pokeapi'
import { usePokemonStore } from '../stores/pokemonStore.js';

const pokemonData = usePokemonStore()

    //const pokeapi = 'https://pokeapi.co/api/v2/pokemon'
export default {
    name: 'PokemonSearch',
    data(){
        return {
            pokemonID: '',
        }
    },
    methods: {
        async searchPokemon() {
            try {
                const pokemonToFind = await fetch(`${pokeapi}/${this.pokemonID}`)//aggara el pokemon con el id
                const pokemon = await pokemonToFind.json()
                pokemonData = pokemon
                console.log(pokemon)
                return pokemon
            } catch (error) {
            alert('Pokemon was not found :(')
            }
        }
    }
}


 
</script>