<template>
    <section id="pokemon-section">
        <button class="pokemon-change" :disabled="Object.entries(checkPokemon()).length === 0"
            :class="{ 'disabled-button': Object.entries(checkPokemon()).length === 0 }"
            @click="previousPokemon()">Previous</button>
        <div class="pokemon" v-if="Object.entries(checkPokemon()).length > 0">
            <div class="info-container">
                <h1 :class="colorText()">
                    {{ capitalize(checkPokemon().name) }}
                </h1>
                    <button :class="colorTextBackground()" class="cry-button" @click="loadCry()"><i class="fa-solid fa-play"></i>Cry</button>
                <!-- <p class="cry-text">Cry</p> -->
            </div>
            <div class="text-wrapper">
                    <p class="sprite-text">Normal</p>
                </div>
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
            <div class="text-wrapper">
                    <p class="sprite-text">Shiny</p>
                </div>
        </div>
        <button class="pokemon-change" :disabled="Object.entries(checkPokemon()).length === 0"
            :class="{ 'disabled-button': Object.entries(checkPokemon()).length === 0 }" @click="nextPokemon()"><i
                class="fa-solid fa-chevron-right"></i></button>
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
            //console.log(pokemonStore.pokemonData.types.length)
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
        },
        colorText(){
            const pokemonStore = usePokemonStore()
            return pokemonStore.pokemonData.types[0].type.name
        },
        colorTextBackground(){
            const pokemonStore = usePokemonStore()
            let background = pokemonStore.pokemonData.types[0].type.name + '-b';
            console.log(background)
            return background
        }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap");
@import url('http://fonts.cdnfonts.com/css/pokemon-solid');
@import '../assets/css/color.css';

#pokemon-section {
    display: flex;
    font-family: 'Lato', sans-serif;
    justify-content: space-around;
    align-items: center;
    margin: 24px 0;
}

.bug .dark .dragon .electric .fairy .fighting .fire .flying .ghost .grass .ground .ice .normal .poison .psychic .rock .steel .water
.bug-b .dark-b .dragon-b .electric-b .fairy-b .fighting-b .fire-b .flying-b .ghost-b .grass-b .ground-b .ice-b .normal-b .poison-b .psychic-b .rock-b .steel-b .water-b{
    font-size: 24px;
    font-weight: 800;
}

.pokemon {
    width: 400px;
    height: 500px;
    /* border: 1px black solid; */
    border-radius: 25px;
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 35px 35px 70px #bababa,
        -35px -35px 70px #ffffff;

}

h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 800;
}

.sprites-container {
    display: flex;
    width: 100%;
    height: 60%;
    flex-wrap: wrap;
    /* border-bottom: 1px black solid; */
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20%;
    margin: 8px 0;
}

.cry-button {
    border: none;
    outline: none;
    cursor: pointer;
    color: white;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    width: 100px;
    font-size: 20px;
    margin: 4px 0;
    padding: 8px 0;
    transition: all 300ms ease;

}

.cry-button:active { /*cuando es clicked*/
    transform: translateY(4px);
}

.cry-text{
    font-size: 18px;
    font-weight: 600; 
}

.info-container i {
    padding: 0 8px;
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

.text-wrapper{
    display: flex;
    justify-content: center;
}

.sprite-text{
    text-align: center;
    font-size: 24px;
    font-weight: 800;  
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

