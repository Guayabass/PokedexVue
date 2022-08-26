<template>
    <section id="Pokemon" v-if="Object.entries(checkPokemon()).length > 0">
        <figure class="pokemon-figure">
            <img class="pokemon-sprite" v-if="!shiny && !gif && static" v-bind:src="loadImage()"
                :alt="checkPokemon().name" />
            <img class="pokemon-sprite" v-else-if="shiny && !gif && static" v-bind:src="loadShinyImage()"
                :alt="checkPokemon().name" />
            <img class="pokemon-sprite-anim" v-else-if="!shiny && gif && !static" v-bind:src="loadGif()"
                :alt="checkPokemon().name" />
            <img class="pokemon-sprite-anim" v-else-if="shiny && gif && !static" v-bind:src="loadShinyGif()"
                :alt="checkPokemon().name" />
        </figure>
        <div class="info-container">
            <h2>
                {{ capitalize(checkPokemon().name) }}
            </h2>
            <div class="pokemon-buttons">
                <button @click="shiny = true">Shiny</button>
                <button @click="loadCry()">Cry</button>
                <button @click="static = false, gif = true">Gif</button>
                <button @click="static = true, gif = false, shiny = false">Reset</button>
            </div>
        </div>
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
            return 'src/assets/pokemon/' + pokemonStore.pokemonData.id + '.png'
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
            return 'src/assets/pokemon/shiny/' + pokemonStore.pokemonData.id + '.png'
        },
        loadGif() {
            const pokemonStore = usePokemonStore()
            if (pokemonStore.pokemonData.id > 649) {
                alert('Unable to find an animated sprite for this Pokemon, sorry :(')
                return 'src/assets/pokemon/' + pokemonStore.pokemonData.id + '.png'
            } else {
                return 'src/assets/pokemon/versions/generation-v/black-white/animated/' + pokemonStore.pokemonData.id + '.gif'
            }
        },
        loadShinyGif() {
            const pokemonStore = usePokemonStore()
            if (pokemonStore.pokemonData.id > 649) {
                alert('Unable to find an animated sprite for this Pokemon, sorry :(')
                return 'src/assets/pokemon/shiny/' + pokemonStore.pokemonData.id + '.png'
            } else {
                return 'src/assets/pokemon/versions/generation-v/black-white/animated/shiny/' + pokemonStore.pokemonData.id + '.gif'
            }
        }
    }
}
</script>

<style>
#Pokemon {
    width: 250px;
    height: 350px;
    border: 1px black solid;
}

h2 {
    text-align: center;
}

.pokemon-figure {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.pokemon-sprite {
    width: 100px;
    height: 100px;
}

.info-container {
    width: 100%;
    height: 175px;
}

.pokemon-buttons {
    display: flex;
    justify-content: space-around;
}

.pokemon-sprite-anim {
    width: fit-content;
    height: fit-content;
}

.pokemon-sprite-anim:hover {
    background-color: rgb(212, 245, 242);
    transition: all 350ms ease;
}

.pokemon-sprite:hover {
    background-color: rgb(212, 245, 242);
    transition: all 350ms ease;
}
</style>