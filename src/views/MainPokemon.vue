<template>
    <NavBar></NavBar>
    <PokemonSearch></PokemonSearch>
    <Pokemon></Pokemon>
    <Transition name="fade">
        <CustomIVsModal v-if="pokemonStore.showIVs"></CustomIVsModal>
    </Transition>
    <Transition name="fade">
        <CustomEVsModal v-if="pokemonStore.showEVs"></CustomEVsModal>
    </Transition>
    <Transition name="fade">
        <CustomNatureModal v-if="pokemonStore.showNature"></CustomNatureModal>
    </Transition>
</template>

<script setup>
import { usePokemonStore } from '../stores/pokemonStore';
import PokemonSearch from '../components/PokemonSearch.vue';
import Pokemon from '../components/Pokemon.vue';
import NavBar from '../components/NavBar.vue';
import CustomIVsModal from '../components/customIVsModal.vue';
import CustomEVsModal from '../components/customEVsModal.vue';
import CustomNatureModal from '../components/customNatureModal.vue';
const pokemonStore = usePokemonStore();


</script>