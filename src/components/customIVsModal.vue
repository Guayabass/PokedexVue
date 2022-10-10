<template>
  <div class="modal" v-if="returnShowIVs() || disabled">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="showIVModal()"><i class="fa-solid fa-xmark"></i></span>
      </div>
      <div class="modal-body">
        <h3 class="title">Enter the custom <span class="blue">IV</span> values you desire for each of the <span
            class="blue">available</span> stats and click the <span class="blue">confirm</span> button to <span
            class="blue">apply</span> the changes to the <span class="blue">global</span> stats.</h3>
        <div class="ivs-container" :class="{'shake' : hp > 31 || hp < 0 && invalid}">
          <button class="decrement-btn" @click="decreaseIV('hp')"> - </button>
          <input class="iv-input" type="number" min="0" max="31" step="1" id="hp-input" v-model="hp" required>
          <button class="increment-btn" @click="increaseIV('hp')"> + </button>
        </div>
        <Transition name="fade">
          <p v-if="hp > 31 || hp < 0 && invalid">Please enter a value between 0 and 31</p>
        </Transition>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</template>

<script>
import { usePokemonStore } from '../stores/pokemonStore.js';

export default {
  name: 'customIVsModal',
  data() {
    return {
      disabled: false,
      invalid: false,
      hp: 0,
    }
  },
  watch: {
    hp() {
      if (this.hp > 31 || this.hp < 0) {
        this.invalid = true
      } else {
        this.invalid = false
      }
    }
  },
  methods: {
    showIVModal() {
      const pokemonStore = usePokemonStore();
      pokemonStore.showIVs = !pokemonStore.showIVs
      return pokemonStore.showIVs
    },
    returnShowIVs() {
      const pokemonStore = usePokemonStore();
      return pokemonStore.showIVs
    },
    increaseIV(stat) {
      if (stat === 'hp') {
        if (this.hp > 31) {
          this.hp = 31
        } else if (this.hp < 0) {
          this.hp = 0
        } else {
          this.hp++
        }
      }
    },
    decreaseIV(stat) {
      if (stat === 'hp') {
        if (this.hp > 31) {
          this.hp = 31
        } else if (this.hp < 0) {
          this.hp = 0
        } else {
          this.hp--
        }
      }
    }
  }
}

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

.modal {
  position: absolute;
  z-index: 100;
  /* Sit on top */
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  position: relative;
  pointer-events: all;
  margin: 0 auto;
  width: 60%;
  height: 50%;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.6s;
  animation-name: animatetop;
  animation-duration: 0.6s
}

.modal-header {
  background-color: #207fb6;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 10%;
}

.modal-body {
  height: 80%;
  width: 90%;
  text-align: center;
  line-height: 32px;
  margin: 0 auto;
}

.modal-footer {
  background-color: #207fb6;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 10%;
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

input {
  border: none;
  outline: none;
}

.close:hover,
.close:focus {
  text-decoration: none;
  cursor: pointer;
}

.blue {
  color: #207fb6;
  transition: all 300ms ease;
  cursor: text;
}

.blue:hover {
  color: #24a1e9;
}

.ivs-container {
  width: 25%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 45px;
  background-color: #24a1e9;
}

/* Chrome, Safari, Edge, Opera - remove scroll in input*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  text-align: center;
  font-size: 40px;
  border: none;
  background-color: #24a1e9;
  color: white;
}

.decrement-btn {
  padding: 15px 5px 15px 25px;
  border-radius: 45px 0 0 45px;
  text-align: center;
}

.increment-btn {
  padding: 15px 25px 15px 5px;
  border-radius: 0 45px 45px 0;
  text-align: center;
}

.ivs-container button {
  color: white;
  background-color: #24a1e9;
  border: none;
  font-size: 40px;
  cursor: pointer;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 300ms ease;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 300ms ease;
}

.shake {
  animation: shake 300ms linear 1 normal;
}

@keyframes shake {
  0% {
    transform: translateX(-5px);
  }

  25% {
    transform: translateX(5px);
  }

  50% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(-5px);
  }
}

@-webkit-keyframes animatetop {
  from {
    top: -300px;
  }

  to {
    top: 0;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
  }

  to {
    top: 0;
  }
}
</style>