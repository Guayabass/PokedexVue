<template>
    <section class="Pokemon" v-if="Object.entries(checkPokemon()).length > 0" >
        {{ checkPokemon().name }}
        <img :src="loadImage()" alt="pokemon-image"> 
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
        loadImage(){
            const pokemonStore = usePokemonStore()
            return 'src/assets/pokemon/'+pokemonStore.pokemonID+'.png'
        }
    }
}

</script>