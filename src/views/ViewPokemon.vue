<template>
    <NavBar></NavBar>
    <div class="pokemon-section">
        <Transition name="fade" mode="out-in">
            <div class="pokemon" :class="{ 'disabled': stats }"
                v-if="!stats">
                <div class="info-container">
                    <h1 :class="this.Pokemon.types[0].type.name">
                        {{ capitalize(checkParam(name)) }}
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
                        <img class="pokemon-sprite" :src="loadSprite()" :alt="Pokemon.name" />
                    </figure>
                    <figure class="pokemon-figure">
                        <img class="pokemon-sprite" :src="loadBackSprite()" :alt="Pokemon.name" />
                    </figure>
                    <figure class="pokemon-figure">
                        <img class="pokemon-sprite" :src="loadShinySprite()" :alt="Pokemon.name" />
                    </figure>
                    <figure class="pokemon-figure">
                        <img class="pokemon-sprite" :src="loadShinyBackSprite()" :alt="Pokemon.name" />
                    </figure>
                </div>
                <div class="text-wrapper">
                    <p class="sprite-text">Shiny</p>
                </div>
                <div class="card-change-wrapper tooltip-container">
                    <button class="card-change" @click="stats = !stats" :disabled="stats"><i
                            class="fa-solid fa-chart-simple"></i></button>
                    <p class="tooltiptext">{{ 'Click to show ' + capitalize(checkPokemon().name) + ' stats!' }}</p>
                </div>
            </div>
            <div class="pokemon" :class="{ 'disabled': !stats }" v-else-if="stats">
                <div class="typings-container">
                    <h1>
                        Typings
                    </h1>
                    <ul class="typings">
                        <li class="pokemon-type" v-for="(type, index) in checkPokemon().types" :key="index"
                            :class="type.type.name + '-b'"><i :class="iconReturn(type.type.name)"></i>{{
                                    capitalize(type.type.name)
                            }}</li>
                    </ul>
                </div>
                <div class="stats-container">
                    <h1 class="stats-title">Stats</h1>
                    <ul class="stats">
                        <li v-for="(stat, index) in checkPokemon().stats" :key="index">
                            <div class="stat-name-wrapper">
                                <p class="stat-name">{{ returnStatNames(stat.stat.name) }}</p>
                            </div>
                            <div class="stat-base-wrapper" :class="colorTextBackground()"
                                :style="{ 'width': pokemonLevel * 0.70 + '%' }">
                                <p class="stat-base">{{ baseStatMultiplier(stat.stat.name, stat.base_stat, index) }}</p>
                            </div>
                        </li>
                        <div class="stats-button-container">
                            <button class="stats-button" @click="showIVModal()">Custom IVs</button>
                            <button class="stats-button" @click="showEVModal()">Custom EVs</button>
                            <button class="stats-button" @click="showNatureModal()">Custom Nature</button>
                            <!-- hacer un objeto para cada nombre de naturaleza con los tipos de ataque y si devuelve 0.9 o 1.1 -->
                        </div>
                    </ul>
                </div>
                <div class="last-stats-wrapper">
                    <div class="slider-container">
                        <input type="range" min="1" max="100" id="myRange" v-model="pokemonLevel" class="slider"
                            :style="'background: linear-gradient(90deg, rgb(23, 114, 212) ' + pokemonLevel + '%, rgb(214, 214, 214) ' + pokemonLevel + '%);'">
                        <div class="slider-text-container">
                            <p class="slider-text">1</p>
                            <p class="slider-text">Level: {{ pokemonLevel }}</p>
                            <p class="slider-text">100</p>
                        </div>
                    </div>
                    <div class="card-change-wrapper-container">
                        <div class="change-btn-wrapper tooltip-container">
                            <button class="card-change" @click="stats = !stats" :disabled="!stats"><i
                                    class="fa-solid fa-arrow-left-long"></i></button>
                            <p class="tooltiptext">{{ 'Click to go back the info page!' }}</p>
                        </div>
                        <div class="change-btn-wrapper tooltip-container">
                            <button class="card-change" @click="resetCustomStats()" :disabled="!stats"><i
                                    class="fa-solid fa-trash"></i></button>
                            <p class="tooltiptext">{{ 'Click to reset the custom stats (IVs/EVs/Nature)!' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>

</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
    name: "ViewPokemon",
    props: ["name"],
    data() {
        return {
            stats: false,
            pokemonLevel: 1,
            sentAlert: false,
            Pokemon: {},
        };
    },
    methods: {
        async checkParam(name){
            try {
                    if (/^[a-zA-Z]+$/.test(name)) {
                        const pokemonToFind = await fetch(`${pokeapi}/${this.name.toLowerCase()}`)
                        const pokemon = await pokemonToFind.json()
                        this.Pokemon = pokemon
                    } else {
                        const pokemonToFind = await fetch(`${pokeapi}/${this.name}`)//aggara el pokemon con el id
                        const pokemon = await pokemonToFind.json()
                        this.Pokemon = pokemon
                    }
            } catch (error) {
                alert('Pokemon was not found :(')
                console.log(error)
            }
        },
        colorTextBackground() {
            let background = this.Pokemon.types[0].type.name + "-b";
            return background;
        },
        loadCry() {
            //console.log(pokemonStore.pokemonData.types.length)
            if (this.Pokemon.id > 721) {
                const audio = new Audio("src/assets/cries/" + this.Pokemon.id + ".wav");
                audio.play();
            } else {
                const audio = new Audio("src/assets/cries/" + this.Pokemon.id + ".ogg");
                audio.play();
            }

        },
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        loadSprite() {
            if (this.Pokemon.id > 649) {
                if (!this.sentAlert) {
                    alert("Unable to find an animated/back sprite for this Pokemon, sorry! :(");
                    this.sentAlert = true
                }
                return "/src/assets/pokemon/" + this.Pokemon.id + ".png";
            }
            else {
                return "/src/assets/pokemon/versions/generation-v/black-white/animated/" + this.Pokemon.id + ".gif";
            }
            //return 'https://img.pokemondb.net/sprites/black-white/anim/normal/' + pokemonStore.pokemonData.name + '.gif'
        },
        loadShinySprite() {
            if (this.Pokemon.id > 649) {
                return "/src/assets/pokemon/shiny/" + this.Pokemon.id + ".png";
            }
            else {
                return "/src/assets/pokemon/versions/generation-v/black-white/animated/shiny/" + this.Pokemon.id + ".gif";
            }
        },
        loadBackSprite() {
            if (this.Pokemon.id > 649) {
                if (this.Pokemon.id > 697 || this.Pokemon.id < 701) {
                    return "/src/assets/pokemon/" + this.Pokemon.id + ".png";
                }
                else {
                    return "/src/assets/pokemon/versions/generation-v/black-white/back/" + this.Pokemon.id + ".png";
                }
            }
            else {
                return "/src/assets/pokemon/versions/generation-v/black-white/animated/back/" + this.Pokemon.id + ".gif";
            }
        },
        loadShinyBackSprite() {
            if (this.Pokemon.id > 649) {
                if (this.Pokemon.id > 697 || this.Pokemon.id < 701) {
                    return "/src/assets/pokemon/shiny/" + this.Pokemon.id + ".png";
                }
                else {
                    return "/src/assets/pokemon/versions/generation-v/black-white/back/shiny/" + this.Pokemon.id + ".png";
                }
            }
            else {
                return "/src/assets/pokemon/versions/generation-v/black-white/animated/back/shiny/" + this.Pokemon.id + ".gif";
            }
        },
    },
    components: { NavBar }
}
</script>

<style>
@import '../assets/css/Pokemon.css';
    .pokemon-section{
       display: flex;
       justify-content: center;
       align-items: center; 
    }
</style>
