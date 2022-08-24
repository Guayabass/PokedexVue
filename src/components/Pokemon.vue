<template>
    <section class="Pokemon" v-if="Object.entries(checkPokemon()).length > 0">
        {{ capitalize(checkPokemon().name) }}
        <img class="pokemons" v-if="!shiny && !gif && static" v-bind:src="loadImage()" :alt="checkPokemon().name" />
        <img class="pokemons" v-else-if="shiny && !gif && static" v-bind:src="loadShinyImage()" :alt="checkPokemon().name" />
        <img class="pokemons" v-else-if="!shiny && gif && !static" v-bind:src="loadGif()" :alt="checkPokemon().name" />
        <img class="pokemons" v-else-if="shiny && gif && !static" v-bind:src="loadShinyGif()" :alt="checkPokemon().name" />
        <button @click="shiny = true">Shiny</button>
        <button @click="loadCry()">Cry</button>
        <button @click="static = false, gif = true">Gif</button>
        <button @click="static = true, gif = false, shiny = false">Reset</button>
        <!---<img v-else-if="!shiny && gif" v-bind:src="loadGif()" :alt="checkPokemon().name" />
        <img v-else :src="loadShinyImage()" :alt="checkPokemon().name" />
        <button @click="changeImage()">Shiny</button>
        <button @click="loadCry()">Cry</button>
        <button @click="changeGif()">Gif</button>-->
    </section>
</template>

<script>
import { usePokemonStore } from '../stores/pokemonStore.js';

//const pokemonStore = usePokemonStore()

export default {
    name: 'Pokemon',
    data() {
        return {
            shiny: false,
            gif: false,
            static: true,
        }
    },
    methods: {
        checkPokemon() {
            const pokemonStore = usePokemonStore()
            return pokemonStore.pokemonData
        },
        loadImage() {
            const pokemonStore = usePokemonStore()
            return 'src/assets/pokemon/' + pokemonStore.pokemonID + '.png'
            //return 'https://img.pokemondb.net/sprites/black-white/anim/normal/' + pokemonStore.pokemonData.name + '.gif'
        },
        loadCry() {
            const pokemonStore = usePokemonStore()
            const audio = new Audio('src/assets/cries/' + pokemonStore.pokemonID + '.ogg');
            audio.play();
        },
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        loadShinyImage() {
            const pokemonStore = usePokemonStore()
            return 'src/assets/pokemon/shiny/' + pokemonStore.pokemonID + '.png'
        },
        loadGif() {
            const pokemonStore = usePokemonStore()
            return 'https://img.pokemondb.net/sprites/black-white/anim/normal/' + pokemonStore.pokemonData.name + '.gif'
        },
        loadShinyGif(){
            const pokemonStore = usePokemonStore()
            return 'https://img.pokemondb.net/sprites/black-white/anim/shiny/' + pokemonStore.pokemonData.name + '.gif' 
        }
    }
}
</script>

<style>

.pokemons{
    width: 150px;
    height: 150px;
}

</style>