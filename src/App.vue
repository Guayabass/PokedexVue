<script setup>
import PokemonSearch from './components/PokemonSearch.vue';
import Pokemon from './components/Pokemon.vue';
import NavBar from './components/NavBar.vue';

</script>

<template>
<main id="PokemonApp">
  <NavBar></NavBar>
  <PokemonSearch></PokemonSearch>
  <Pokemon></Pokemon>
</main>

</template>


<style scoped>
  #PokemonApp{
    width: 100%;
    height: 100vh;
    background-color: white;
  }
</style>
