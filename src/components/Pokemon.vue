<template>
    <section id="pokemon-section">
        <button class="pokemon-change" :disabled="Object.entries(checkPokemon()).length === 0"
            :class="{ 'disabled-button': Object.entries(checkPokemon()).length === 0 }"
            @click="previousPokemon()">Previous</button>
        <div class="pokemon" v-if="Object.entries(checkPokemon()).length > 0">
            <!--Hacer otro componente para bulbasaur-->
            <div class="sprites-container">
                <figure class="pokemon-figure">
                    <img class="pokemon-sprite" :src="loadSprite()" :alt="checkPokemon().name" />
                </figure>
                <figure class="pokemon-figure">
                    <img class="pokemon-sprite" :src="loadBackSprite()" :alt="checkPokemon().name" />
                </figure>
                <figure class="pokemon-figure">
                    <img class="pokemon-sprite" :src="loadShinySprite()" :alt="checkPokemon().name" />
                </figure>
                <figure class="pokemon-figure">
                    <img class="pokemon-sprite" :src="loadShinyBackSprite()" :alt="checkPokemon().name" />
                </figure>
            </div>
            <div class="info-container">
                <h2>
                    {{  capitalize(checkPokemon().name)  }}
                </h2>
                <div class="pokemon-buttons">
                    <button @click="loadCry()">Cry</button>
                </div>
            </div>
        </div>
        <button class="pokemon-change" :disabled="Object.entries(checkPokemon()).length === 0"
            :class="{ 'disabled-button': Object.entries(checkPokemon()).length === 0 }"
            @click="nextPokemon()">Next</button>
    </section>
</template>

<script>
import { usePokemonStore } from '../stores/pokemonStore.js';

//const pokemonStore = usePokemonStore()

export default {
    name: 'Pokemon',
    methods: {
        checkPokemon() {
            const pokemonStore = usePokemonStore()
            return pokemonStore.pokemonData
        },
        loadSprite() {
            const pokemonStore = usePokemonStore()
            if (pokemonStore.pokemonData.id > 649) {
                alert('Unable to find an animated/back sprite for this Pokemon, sorry! :(')
                return 'src/assets/pokemon/' + pokemonStore.pokemonData.id + '.png'
            } else {
                return 'src/assets/pokemon/versions/generation-v/black-white/animated/' + pokemonStore.pokemonData.id + '.gif'
            }

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
        loadShinySprite() {
            const pokemonStore = usePokemonStore()
            if (pokemonStore.pokemonData.id > 649) {
                return 'src/assets/pokemon/shiny/' + pokemonStore.pokemonData.id + '.png'
            } else {
                return 'src/assets/pokemon/versions/generation-v/black-white/animated/shiny/' + pokemonStore.pokemonData.id + '.gif'
            }

        },
        loadBackSprite() {
            const pokemonStore = usePokemonStore()
            if (pokemonStore.pokemonData.id > 649) {
                if (pokemonStore.pokemonData.id > 697 || pokemonStore.pokemonData.id < 701) {
                    return 'src/assets/pokemon/' + pokemonStore.pokemonData.id + '.png'
                } else {
                    return 'src/assets/pokemon/versions/generation-v/black-white/back/' + pokemonStore.pokemonData.id + '.png'
                }
            } else {
                return 'src/assets/pokemon/versions/generation-v/black-white/animated/back/' + pokemonStore.pokemonData.id + '.gif'
            }
        },
        loadShinyBackSprite() {
            const pokemonStore = usePokemonStore()
            if (pokemonStore.pokemonData.id > 649) {
                if (pokemonStore.pokemonData.id > 697 || pokemonStore.pokemonData.id < 701) {
                    return 'src/assets/pokemon/shiny/' + pokemonStore.pokemonData.id + '.png'
                } else {
                    return 'src/assets/pokemon/versions/generation-v/black-white/back/shiny/' + pokemonStore.pokemonData.id + '.png'
                }
            } else {
                return 'src/assets/pokemon/versions/generation-v/black-white/animated/back/shiny/' + pokemonStore.pokemonData.id + '.gif'
            }
        },
        nextPokemon() {
            const pokemonStore = usePokemonStore()
            pokemonStore.nextPokemon()
            pokemonStore.changePokemon
        },
        previousPokemon() {
            const pokemonStore = usePokemonStore()
            pokemonStore.previousPokemon()
            pokemonStore.changePokemon
        }
    }
}
</script>

<style>
.pokemon {
    width: 400px;
    height: 500px;
    border: 1px black solid;
}

h2 {
    text-align: center;
}

.sprites-container {
    display: flex;
    width: 100%;
    height: 50%;
    flex-wrap: wrap;
    border-bottom: 1px black solid;
}

.pokemon-figure {
    width: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 0;
}

.pokemon-sprite {
    width: fit-content;
    height: fit-content;
}

.info-container {
    width: 100%;
    height: 50%;
}

.pokemon-buttons {
    display: flex;
    justify-content: space-around;
}

.pokemon-sprite-anim:hover {
    background-color: rgb(212, 245, 242);
    transition: all 350ms ease;
}

.pokemon-sprite:hover {
    background-color: rgb(212, 245, 242);
    transition: all 350ms ease;
}

.disabled-button {
    cursor: not-allowed;
}
</style>

<!--<figure class="pokemon-figure">
    <img class="pokemon-sprite" v-if="!shiny && !gif && static" :src="loadImage()"
        :alt="checkPokemon().name" />
    <img class="pokemon-sprite" v-else-if="shiny && !gif && static" :src="loadShinyImage()"
        :alt="checkPokemon().name" />
    <img class="pokemon-sprite-anim" v-else-if="!shiny && gif && !static" :src="loadGif()"
        :alt="checkPokemon().name" />
    <img class="pokemon-sprite-anim" v-else-if="shiny && gif && !static" :src="loadShinyGif()"
        :alt="checkPokemon().name" />
</figure>-->

