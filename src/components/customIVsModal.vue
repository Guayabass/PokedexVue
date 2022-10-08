<template>
    <div class="modal" >
        <div class="modal-content">
            <span class="close" @click="showIVModal()"><i class="fa-solid fa-xmark"></i></span>
            <p>Some text in the Modal..</p>
        </div>
    </div>
</template>

<script>
import { usePokemonStore } from '../stores/pokemonStore.js';

export default {
    name: 'customIVsModal',
    // data() {
    //     return {
    //         disabled: false,
    //     }
    // },
    methods: {
        showIVModal(){
            const pokemonStore = usePokemonStore();
            pokemonStore.showIVs = !pokemonStore.showIVs
            return pokemonStore.showIVs
        }
    }
}

</script>

<style>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  pointer-events: all;
  margin: 0 auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
}

/* The Close Button */
.close {
  color: #207fb6;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  text-decoration: none;
  cursor: pointer;
}
</style>