<template>
  <div class="modal" v-if="returnShowIVs() || disabled">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="showIVModal()"><i class="fa-solid fa-xmark"></i></span>
      </div>
      <div class="modal-body">
        <h3 class="title">Enter the custom <span class="blue">IV</span> values you desire for each of the
          available stats and click the <span class="blue">confirm</span> button to apply the changes to the <span
            class="blue">global</span> stats.</h3>
        <ul>
          <li class="ivs-container" v-for="(iv, key, index) in ivsObject">
            <h3 class="ivs-title">{{key}}'s <span class="blue">IVs</span>:</h3>
            <i class="fa-solid fa-arrow-right-long"></i>
            <div class="btn-container" :class="{'shake' : iv > 31 || iv < 0 && invalid}">
              <button class="decrement-btn" @click="decreaseIV(iv, key)"> - </button>
              <input class="iv-input" type="number" min="0" max="31" step="1" :id="iv+'-input'" v-model="ivsObject[key]"
                required>
              <button class="increment-btn" @click="increaseIV(iv, key)"> + </button>
            </div>
            <Transition name="fade">
              <p v-if="iv > 31 || iv < 0 && invalid">Please enter a value between 0 and 31</p>
            </Transition>
          </li>
        </ul>
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
      ivsObject: {
        HP: 0,
        Attack: 0,
        Defense: 0,
        SpecialAttack: 0,
        SpecialDefense: 0,
        Speed: 0,
      },
      //hp: 0,
    }
  },
  watch: {
    //can'tt use a for or else it'll only work on the last one (Speed)
    'ivsObject.HP': function (newValue) {
      if (newValue > 31 || newValue < 0) {
        this.invalid = true
      } else {
        this.invalid = false
      }
    },
    'ivsObject.Attack': function (newValue) {
      if (newValue > 31 || newValue < 0) {
        this.invalid = true
      } else {
        this.invalid = false
      }
    },
    'ivsObject.Defense': function (newValue) {
      if (newValue > 31 || newValue < 0) {
        this.invalid = true
      } else {
        this.invalid = false
      }
    },
    'ivsObject.SpecialAttack': function (newValue) {
      if (newValue > 31 || newValue < 0) {
        this.invalid = true
      } else {
        this.invalid = false
      }
    },
    'ivsObject.SpecialDefense': function (newValue) {
      if (newValue > 31 || newValue < 0) {
        this.invalid = true
      } else {
        this.invalid = false
      }
    },
    'ivsObject.Speed': function (newValue) {
      if (newValue > 31 || newValue < 0) {
        this.invalid = true
      } else {
        this.invalid = false
      }
    },
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
    increaseIV(iv, key) {
      if (iv > 31) {
        this.ivsObject[key] = 31
      } else if (iv < 0) {
        this.ivsObject[key] = 0
      } else {
        this.ivsObject[key]++
      }
    },
    decreaseIV(iv, key) {
      if (iv > 31) {
        this.ivsObject[key] = 31
      } else if (iv < 0) {
        this.ivsObject[key] = 0
      } else {
        this.ivsObject[key]--
      }
    },
    returnKey(key){
      return key
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  height: calc(100%/6);
  width: 50%;
  display: flex;
  margin: 16px 0;
  justify-content: space-evenly;
}

.ivs-container i {
  font-size: 36px;
  color: #24a1e9;
}

.btn-container {
  width: 25%;
  height: 15%;
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
  font-size: 24px;
  border: none;
  background-color: #24a1e9;
  color: white;
}

.decrement-btn {
  padding: 5px 3px 5px 10px;
  border-radius: 45px 0 0 45px;
  text-align: center;
}

.increment-btn {
  padding: 5px 10px 5px 3px;
  border-radius: 0 45px 45px 0;
  text-align: center;
}

.btn-container button {
  color: white;
  background-color: #24a1e9;
  border: none;
  font-size: 24px;
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