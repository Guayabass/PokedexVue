<template>
    <section class="Pokemon" v-if="Object.entries(checkPokemon()).length > 0">
        {{ capitalize(checkPokemon().name) }}
        <img v-if="!shiny" v-bind:src="loadImage()" :alt="checkPokemon().name" />
        <img v-else :src="loadShinyImage()" :alt="checkPokemon().name" />
        <button @click="changeImage()">shiny</button>
        <button @click="loadCry()">Cry</button>
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
        }
    },
    methods: {
        checkPokemon() {
            const pokemonStore = usePokemonStore()
            this.img = 'src/assets/pokemon/' + pokemonStore.pokemonID + '.png'
            return pokemonStore.pokemonData
        },
        loadImage() {
            const pokemonStore = usePokemonStore()
            //console.log(this.hover)
            return 'src/assets/pokemon/' + pokemonStore.pokemonID + '.png'
            
        },
        changeImage(){
            if (this.shiny ) {
                this.shiny = false
            } else {
                this.shiny = true
            }
        },
        loadShinyImage() {
            const pokemonStore = usePokemonStore()
            //console.log(this.hover)
            return 'src/assets/pokemon/shiny/' + pokemonStore.pokemonID + '.png'
        },
        loadCry(){
            const pokemonStore = usePokemonStore()
            const audio = new Audio('src/assets/cries/' + pokemonStore.pokemonID + '.ogg');
            audio.play();
        },
        capitalize(string){
           return string.charAt(0).toUpperCase() + string.slice(1); 
        }
    }
}
</script>
