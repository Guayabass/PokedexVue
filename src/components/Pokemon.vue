<template>
    <section class="Pokemon" v-if="Object.entries(pokemonStore.pokemonData).length > 0" >
        test
    </section>
</template>

<script>
import { usePokemonStore } from '../stores/pokemonStore.js';

const pokemonStore = usePokemonStore()

export default {}

</script>