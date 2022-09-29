<template>
    <section class="pokemon-section" :class="{ 'disabled': Object.entries(checkPokemon()).length === 0 }">
        <Transition name="button">
            <button class="pokemon-change" v-if="Object.entries(checkPokemon()).length > 0"
                :disabled="Object.entries(checkPokemon()).length === 0"
                :class="{ 'disabled': Object.entries(checkPokemon()).length === 0}" @click="previousPokemon()"><i
                    class="fa-solid fa-chevron-left"></i></button>
            <!--the if is just there for transition purposes -->
        </Transition>
        <Transition name="fade" mode="out-in">
            <div class="pokemon" :class="{'disabled': stats}"
                v-if="Object.entries(checkPokemon()).length > 0 && !stats">
                <div class="info-container">
                    <h1 :class="colorText()">
                        {{ capitalize(checkPokemon().name) }}
                    </h1>
                    <button :class="colorTextBackground()" class="cry-button" :disabled="stats" @click="loadCry()"><i
                            class="fa-solid fa-play"></i>Cry</button>
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
                <div class="card-change-wrapper tooltip-container">
                    <button class="card-change" @click="stats = !stats" :disabled="stats"><i
                            class="fa-solid fa-chart-simple"></i></button>
                    <p class="tooltiptext">{{'Click to show '+capitalize(checkPokemon().name) +' stats!'}}</p>
                </div>
            </div>
            <div class="pokemon" :class="{'disabled': !stats}" v-else-if="stats">
                <div class="info-container">
                    <h1>
                        Typings
                    </h1>
                    <ul class="typings">
                        <li class="pokemon-type" v-for="(type, index) in checkPokemon().types" :key="index" :class="type.type.name + '-b' "><i :class="iconReturn(type.type.name)"></i>{{ capitalize(type.type.name) }}</li>
                    </ul>
                </div>
                <button class="card-change" @click="stats = !stats" :disabled="!stats"><i
                        class="fa-solid fa-chart-simple"></i></button>
                <div class="slider-container">
                    <input type="range" min="1" max="100" id="myRange" v-model="pokemonLevel" class="slider" :style="'background: linear-gradient(90deg, rgb(23, 114, 212) '+pokemonLevel+'%, rgb(214, 214, 214) '+pokemonLevel+'%);'">
                    <div class="slider-text-container">
                    <p class="slider-text">1</p>
                    <p class="slider-text">Level</p>
                    <p class="slider-text">100</p>
                </div>
                </div>
            </div>
        </Transition>
        <Transition name="button">
            <button class="pokemon-change" v-if="Object.entries(checkPokemon()).length > 0"
                :disabled="Object.entries(checkPokemon()).length === 0"
                :class="{ 'disabled': Object.entries(checkPokemon()).length === 0}" @click="nextPokemon()"><i
                    class="fa-solid fa-chevron-right"></i></button>
            <!--the if is just there for transition purposes -->
        </Transition>
    </section>
</template>

<script>
import { usePokemonStore } from '../stores/pokemonStore.js';

//const pokemonStore = usePokemonStore()

export default {
    name: "Pokemon",
    data() {
        return {
            stats: false,
            pokemonLevel: 1,
        };
    },
    methods: {
        checkPokemon() {
            const pokemonStore = usePokemonStore();
            return pokemonStore.pokemonData;
        },
        loadSprite() {
            const pokemonStore = usePokemonStore();
            if (pokemonStore.pokemonData.id > 649) {
                alert("Unable to find an animated/back sprite for this Pokemon, sorry! :(");
                return "src/assets/pokemon/" + pokemonStore.pokemonData.id + ".png";
            }
            else {
                return "src/assets/pokemon/versions/generation-v/black-white/animated/" + pokemonStore.pokemonData.id + ".gif";
            }
            //return 'https://img.pokemondb.net/sprites/black-white/anim/normal/' + pokemonStore.pokemonData.name + '.gif'
        },
        loadCry() {
            const pokemonStore = usePokemonStore();
            //console.log(pokemonStore.pokemonData.types.length)
            const audio = new Audio("src/assets/cries/" + pokemonStore.pokemonID + ".ogg");
            audio.play();
        },
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        loadShinySprite() {
            const pokemonStore = usePokemonStore();
            if (pokemonStore.pokemonData.id > 649) {
                return "src/assets/pokemon/shiny/" + pokemonStore.pokemonData.id + ".png";
            }
            else {
                return "src/assets/pokemon/versions/generation-v/black-white/animated/shiny/" + pokemonStore.pokemonData.id + ".gif";
            }
        },
        loadBackSprite() {
            const pokemonStore = usePokemonStore();
            if (pokemonStore.pokemonData.id > 649) {
                if (pokemonStore.pokemonData.id > 697 || pokemonStore.pokemonData.id < 701) {
                    return "src/assets/pokemon/" + pokemonStore.pokemonData.id + ".png";
                }
                else {
                    return "src/assets/pokemon/versions/generation-v/black-white/back/" + pokemonStore.pokemonData.id + ".png";
                }
            }
            else {
                return "src/assets/pokemon/versions/generation-v/black-white/animated/back/" + pokemonStore.pokemonData.id + ".gif";
            }
        },
        loadShinyBackSprite() {
            const pokemonStore = usePokemonStore();
            if (pokemonStore.pokemonData.id > 649) {
                if (pokemonStore.pokemonData.id > 697 || pokemonStore.pokemonData.id < 701) {
                    return "src/assets/pokemon/shiny/" + pokemonStore.pokemonData.id + ".png";
                }
                else {
                    return "src/assets/pokemon/versions/generation-v/black-white/back/shiny/" + pokemonStore.pokemonData.id + ".png";
                }
            }
            else {
                return "src/assets/pokemon/versions/generation-v/black-white/animated/back/shiny/" + pokemonStore.pokemonData.id + ".gif";
            }
        },
        nextPokemon() {
            const pokemonStore = usePokemonStore();
            pokemonStore.nextPokemon();
            pokemonStore.changePokemon;
        },
        previousPokemon() {
            const pokemonStore = usePokemonStore();
            pokemonStore.previousPokemon();
            pokemonStore.changePokemon;
        },
        colorText() {
            const pokemonStore = usePokemonStore();
            return pokemonStore.pokemonData.types[0].type.name;
        },
        colorTextBackground() {
            const pokemonStore = usePokemonStore();
            let background = pokemonStore.pokemonData.types[0].type.name + "-b";
            return background;
        },
        iconReturn(type){
            if (type === 'normal') {
                return 'fa-solid '+'fa-'+'circle-dot'
            } 

            else if (type === 'water') {
                return 'fa-solid '+'fa-'+'droplet'
            }

            else if (type === 'grass') {
                return 'fa-solid '+'fa-'+'leaf'
            }

            else if (type === 'electric') {
                return 'fa-solid '+'fa-'+'bolt'
            }

            else if (type === 'ice') {
                return 'fa-solid '+'fa-'+'snowflake'
            }

            else if (type === 'fighting') {
                return 'fa-solid '+'fa-'+'hand-fist'
            }

            else if (type === 'poison') {
                return 'fa-solid '+'fa-'+'skull-crossbones'
            }

            else if (type === 'ground') {
                return 'fa-solid '+'fa-'+'mountain-sun'
            }

            else if (type === 'rock') {
                return 'fa-solid '+'fa-'+'mountain'
            }

            else if (type === 'flying') {
                return 'fa-solid '+'fa-'+'feather'
            }

            else if (type === 'psychic') {
                return 'fa-solid '+'fa-'+'eye'
            }

            else if (type === 'dark') {
                return 'fa-solid '+'fa-'+'moon'
            }

            else if (type === 'steel') {
                return 'fa-solid '+'fa-'+'weight-hanging'
            }

            else if (type === 'fairy') {
                return 'fa-solid '+'fa-'+'wand-sparkles'
            }
            
            else {
                return 'fa-solid '+'fa-'+type
            }
        }
        //  switchChange() {
        //      setTimeout(() => {
        //          this.change = !this.change
        //      }, "800")
        //  },
    },
    //components: { PokemonStats }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap");
@import url('http://fonts.cdnfonts.com/css/pokemon-solid');
@import '../assets/css/color.css';

.pokemon-section {
    display: flex;
    font-family: 'Lato', sans-serif;
    justify-content: space-evenly;
    /**space between for responsive in media*/
    align-items: center;
    width: 100%;
    height: 50%;
    opacity: 1;
    cursor: default;
    /* transition: opacity 2000ms ease; */
}

.bug .dark .dragon .electric .fairy .fighting .fire .flying .ghost .grass .ground .ice .normal .poison .psychic .rock .steel .water .bug-b .dark-b .dragon-b .electric-b .fairy-b .fighting-b .fire-b .flying-b .ghost-b .grass-b .ground-b .ice-b .normal-b .poison-b .psychic-b .rock-b .steel-b .water-b {
    font-size: 24px;
    font-weight: 800;
}

.pokemon {
    width: 400px;
    height: 500px;
    margin-top: 48px;
    /* border: 1px black solid; */
    border-radius: 25px;
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 35px 35px 70px #bababa,
        -35px -35px 70px #ffffff;
    /**transition: opacity 2000ms ease;**/
    cursor: default;
}

h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 800;
}

.sprites-container {
    display: flex;
    width: 100%;
    height: 50%;
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

.cry-button:active {
    /*cuando es clicked*/
    transform: translateY(4px);
}

.cry-text {
    font-size: 18px;
    font-weight: 600;
}

.info-container i {
    padding: 0 8px;
}

.card-change-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15%;
    width: 100%;
}

.card-change {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    font-size: 28px;
    color: #207fb6;
    margin-left: 8px;
}

.tooltip-container {
    /*container del tooltip*/
    position: relative;
    display: flex;
    /*border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

.tooltip-container .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: rgb(155, 155, 155);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    margin-top: 4px;
    position: absolute;
    z-index: 1;
    top: 75%;
    left: 50%;
    margin-left: -60px;
    /* Fade in tooltip - takes 1 second to go from 0% to 100% opac: */
    opacity: 0;
    transition: opacity 1s;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip-container:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}

.tooltip-container .tooltiptext::after {
    /*para que tenga flecha*/
    content: " ";
    position: absolute;
    bottom: 100%;
    /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent rgb(83, 81, 81) transparent;
}

.pokemon-sprite-anim:hover {
    background-color: rgb(212, 245, 242);
    transition: all 350ms ease;
}

.pokemon-sprite:hover {
    background-color: rgb(212, 245, 242);
    transition: all 350ms ease;
}

.pokemon-change {
    border: none;
    outline: none;
    cursor: pointer;
    color: #207fb6;
    font-size: 48px;
    background-color: transparent;
    transition: transform 300ms ease;
}

.pokemon-change:active {
    /*cuando es clicked*/
    transform: translateY(4px);
}

.disabled {
    opacity: 0;
}

.active {
    opacity: 1;
}

.text-wrapper {
    display: flex;
    justify-content: center;
}

.sprite-text {
    text-align: center;
    font-size: 24px;
    font-weight: 800;
}

.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

.fade-enter-active {
    transition: opacity 800ms ease;
}

.fade-leave-from {
    opacity: 1;
}

.fade-leave-to {
    opacity: 0;
}

.fade-leave-active {
    transition: opacity 800ms ease;
}

.button-enter-from {
    opacity: 0;
}

.button-enter-to {
    opacity: 1;
}

.button-enter-active {
    transition: opacity 2500ms ease;
}

.pokemon-type{
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35%;
    border-radius: 24px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    height: 40px;
    transition: all 300ms ease-in-out;
}

.pokemon-type:hover{
    filter: brightness(120%);
}

.typings{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 8px 0;
    width: 100%;
}

.slider-container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.slider{
    -webkit-appearance: none;
    width: 80%;
    height: 20px;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2;
    border-radius: 12px;
    box-shadow: 0px 1px 10px 1px black;
}

.slider:hover{
    opacity: 1;
}

.slider::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
}

.slider-text-container{
    width: 80%;
    display: flex;
    justify-content: space-between;
}

.slider-text{
    width: calc(80% / 3);
    font-size: 16px;
    font-weight: 500;
    margin-top: 8px;
}

.slider-text:nth-child(1){
    text-align: left;
}

.slider-text:nth-child(2){
    text-align: center;
}

.slider-text:nth-child(3){
    text-align: right;
}
</style>



