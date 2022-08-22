

<script>
import { pokeapi } from '@/api/pokeapi'
import { usePokemonStore } from '../stores/pokemonStore.js';

//const pokeapi = 'https://pokeapi.co/api/v2/pokemon'
export default {
    name: 'PokemonSearch',
    data() {
        return {
            pokemonInfo: '',
        }
    },
    methods: {
        async searchPokemon() {
            try {
                if (/^[a-zA-Z]+$/.test(this.pokemonInfo)) {
                    const pokemonToFind = await fetch(`${pokeapi}/${this.pokemonInfo.toLowerCase()}`)
                    const pokemon = await pokemonToFind.json()
                    let ID = ''
                    ID = pokemon.id
                    //console.log(pokemon.id)
                    this.addPokemon(pokemon, ID)
                   // console.log(ID)
                    return pokemon
                } else {
                    const pokemonToFind = await fetch(`${pokeapi}/${this.pokemonInfo}`)//aggara el pokemon con el id
                    const pokemon = await pokemonToFind.json()
                    //console.log(pokemon)
                    this.addPokemon(pokemon, this.pokemonInfo)
                    return pokemon
                }
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
            Enter the Pokedex ID of the Pokemon or its name:
            <input type="text" id="search" @keyup.enter="searchPokemon()" v-model="pokemonInfo">
            <!--v-model para pasar el pokemonID-->
            <button @click="searchPokemon">Search pokemon</button>
        </label>
    </header>
</template>
