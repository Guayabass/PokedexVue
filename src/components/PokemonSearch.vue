

<script>
import { pokeapi } from '@/api/pokeapi'
import { usePokemonStore } from '../stores/pokemonStore.js';

//const pokeapi = 'https://pokeapi.co/api/v2/pokemon'
export default {
    name: 'PokemonSearch',
    data() {
        return {
            pokemonNameOrID: '',
            defaultPokemon: {}
        }
    },
    methods: {
        async searchPokemon() {
            try {
                /**if (Object.entries(this.defaultPokemon).length === 0){
                    const pokemonToFind = await fetch(`${pokeapi}/${1}`)
                    const pokemon = await pokemonToFind.json()
                    this.addPokemon(pokemon, 1)
                } else {**/
                if (/^[a-zA-Z]+$/.test(this.pokemonNameOrID)) {
                    const pokemonToFind = await fetch(`${pokeapi}/${this.pokemonNameOrID.toLowerCase()}`)
                    const pokemon = await pokemonToFind.json()
                    let ID = ''
                    ID = pokemon.id
                    //console.log(pokemon.id)
                    this.addPokemon(pokemon, ID)
                   // console.log(ID)
                    return pokemon
                } else {
                    const pokemonToFind = await fetch(`${pokeapi}/${this.pokemonNameOrID}`)//aggara el pokemon con el id
                    const pokemon = await pokemonToFind.json()
                    //console.log(pokemon)
                    this.addPokemon(pokemon, this.pokemonNameOrID)
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap");

    header {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-family: 'Lato', sans-serif;
    }

    .form{
        position: relative;
        width: 50%;
        height: 50px;
    }
</style>

<template>
    <header>
        <div class="form">
            <input type="text" name="Pokemon" autocomplete="off" required @keyup.enter="searchPokemon()" v-model="pokemonNameOrID">
            <label for="Pokemon" class="label-name">
                <span class="content-pokemon">Pokemon</span>
            </label>
        </div>
    </header>
    <!--<header class="search">
        <label for="search">
            Enter the Pokedex ID of the Pokemon or its name:
            <input type="text" id="search" @keyup.enter="searchPokemon()" v-model="pokemonNameOrID">
            
            <button @click="searchPokemon">Search pokemon</button>
        </label>
    </header>-->
</template>



