<template>
    <section class="pokemon-section">
        <div class="pokemon">
            <div class="info-container">
                <h1 :class="colorText()">
                    {{ capitalize(name) }}
                </h1>
                <button :class="colorTextBackground()" class="cry-button" @click="loadCry()"><i
                        class="fa-solid fa-play"></i>Cry</button>
            </div>
            <div class="text-wrapper">
                <p class="sprite-text">Normal</p>
            </div>
            <div class="sprites-container">
                <figure class="pokemon-figure">
                    <img class="pokemon-sprite" :src="loadSprite()" :alt="name" />
                </figure>
                <figure class="pokemon-figure">
                    <img class="pokemon-sprite" :src="loadBackSprite()" :alt="name" />
                </figure>
                <figure class="pokemon-figure">
                    <img class="pokemon-sprite" :src="loadShinySprite()" :alt="name" />
                </figure>
                <figure class="pokemon-figure">
                    <img class="pokemon-sprite" :src="loadShinyBackSprite()" :alt="name" />
                </figure>
            </div>
            <div class="text-wrapper">
                <p class="sprite-text">Shiny</p>
            </div>
            <div class="main-card-button-container">
                <div class="card-change-wrapper tooltip-container">
                    <button data-cy="remove-fav-btn" @click="authStore.deleteFavorite(id)" class="card-change"><i class="fa-solid fa-trash"></i></button>
                    <p class="tooltiptext">{{ 'Remove ' + capitalize(name) + ' from favorites!' }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore.js';
import { pokeapi } from '@/exports/pokeapi'
export default {
    name: "FavoritePokemonSprite",
    props: {
        name: String,
        id: Number,
    },
    async setup(props) {
        const Pokemon = ref(null);
        const authStore = useAuthStore()
        const pokemonToFind = await fetch(`${pokeapi}/${props.name}`)
        const pokemon = await pokemonToFind.json()

        Pokemon.value = pokemon

        return {Pokemon, authStore}
    },
    // async mounted() {
    //     try {
    //         const pokemonToFind = await fetch(`${pokeapi}/${this.name}`)
    //         const pokemon = await pokemonToFind.json()
    //         this.Pokemon = pokemon

    //     } catch (error) {
    //         console.log(error)
    //     }
    // },
    data() {
        return {
            load: false
        };
    },
    methods: {
        loadSprite() {
            if (this.id > 649) {
                return "/src/assets/pokemon/" + this.id + ".png";
            }
            else {
                return "/src/assets/pokemon/versions/generation-v/black-white/animated/" + this.id + ".gif";
            }
        },
        loadCry() {
            if (this.id > 721) {
                const audio = new Audio("/src/assets/cries/" + this.id + ".wav");
                audio.play();
            } else {
                const audio = new Audio("/src/assets/cries/" + this.id + ".ogg");
                audio.play();
            }

        },
        loadShinySprite() {
            if (this.id > 649) {
                return "/src/assets/pokemon/shiny/" + this.id + ".png";
            }
            else {
                return "/src/assets/pokemon/versions/generation-v/black-white/animated/shiny/" + this.id + ".gif";
            }
        },
        loadBackSprite() {
            if (this.id > 649) {
                if (this.id > 697 || this.id < 701) {
                    return "/src/assets/pokemon/" + this.id + ".png";
                }
                else {
                    return "/src/assets/pokemon/versions/generation-v/black-white/back/" + this.id + ".png";
                }
            }
            else {
                return "/src/assets/pokemon/versions/generation-v/black-white/animated/back/" + this.id + ".gif";
            }
        },
        loadShinyBackSprite() {
            if (this.id > 649) {
                if (this.id > 697 || this.id < 701) {
                    return "/src/assets/pokemon/shiny/" + this.id + ".png";
                }
                else {
                    return "/src/assets/pokemon/versions/generation-v/black-white/back/shiny/" + this.id + ".png";
                }
            }
            else {
                return "/src/assets/pokemon/versions/generation-v/black-white/animated/back/shiny/" + this.id + ".gif";
            }
        },
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        colorText() {
            return this.Pokemon.types[0].type.name;
        },
        colorTextBackground() {
            let background = this.Pokemon.types[0].type.name + "-b";
            return background;
        },
    }
}
</script>

<style scoped>
@import '@/assets/css/Pokemon.css';

.pokemon{
    width: 350px;
    height: 400px;
}

.card-change{
    margin-bottom: 18px;
    color: red;
}
</style>