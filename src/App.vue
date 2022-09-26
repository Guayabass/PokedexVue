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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#PokemonApp {
  width: 80%;
  height: 100vh;
  background-color: white;
  margin: 0 auto;
}
</style>
