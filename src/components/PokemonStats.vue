<template>
            <h1>test</h1>
         <!-- <button class="card-change" @click="stats = !stats, waitStats()" :disabled="stats"><i class="fa-solid fa-square-info"></i></button>  -->
</template>

<script>
import { usePokemonStore } from '../stores/pokemonStore.js';

//const pokemonStore = usePokemonStore()

export default {
    name: 'PokemonStats',
    data (){
        return{
            delay: '0.5s'
        }
    }, 
    methods: {

    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap");
@import url('http://fonts.cdnfonts.com/css/pokemon-solid');
@import '../assets/css/color.css';

</style>



