<template>
    <div class="modal" v-if="returnShowEVs()">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" @click="showEVModal()"><i class="fa-solid fa-xmark"></i></span>
        </div>
        <div class="modal-body">
          <h3 class="title">Enter the custom <span class="blue">EV</span> values you desire for each of the
            available stats and click the <span class="blue">confirm</span> button to apply the changes to the <span
              class="blue">global</span> stats.</h3>
          <div class="select-container">

          </div>
          <h3><strong>NOTE:</strong> Changing Pokemon will <span class="red">NOT</span> reset any custom IVs/EVs/Nature set.</h3>
        </div>
        <div class="modal-footer">
          <div class="btns-container">
            <button class="btn-confirm" @click="storeEVs()">Confirm</button>
            <button class="btn-cancel" @click="showEVModal()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import { usePokemonStore } from '../stores/pokemonStore.js';

export default {
  name: 'customNatureModal',
  data() {
    return {
      evsObject: {
        HP: 0,
        Attack: 0,
        Defense: 0,
        SpecialAttack: 0,
        SpecialDefense: 0,
        Speed: 0,
      },
      customEVs: [],
      //hp: 0,
    }
  },
  watch: {
  },
  methods: {
    showEVModal() {
      const pokemonStore = usePokemonStore();
      pokemonStore.showEVs = !pokemonStore.showEVs
      return pokemonStore.showEVs
    },
    returnShowEVs() {
      const pokemonStore = usePokemonStore();
      return pokemonStore.showEVs
    },
    increaseEV(key) {
      this.evsObject[key]++
    },
    decreaseEV(key) {
      this.evsObject[key]--

    },
    storeEVs() {
      const pokemonStore = usePokemonStore();
      for (let EV in this.evsObject) {
        this.customEVs.push(this.evsObject[EV])
      }
      pokemonStore.arrayEVs = this.customEVs
      this.showEVModal()
      //console.log(pokemonStore.arrayIVs)
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
  z-index: 1;
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

.red{
  color: red;
  font-weight: 700;
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

.btns-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btns-container button {
  font-size: 18px;
  border: #fefefe solid 3px;
  font-weight: 700;
  background-color: transparent;
  color: white;
  cursor: pointer;
  margin: 0 16px;
  padding: 4px 8px;
  border-radius: 4px;
  position: relative;
  z-index: 1;
}

.btns-container button::before {
  transition: all 500ms ease;
  position: absolute;
  content: "";
  top: 0;
  right: 50%;
  opacity: 0;
  left: 50%;
  bottom: 0;
}

.btns-container .btn-confirm::before {
  background-color: rgb(140, 184, 74);
}

.btns-container .btn-cancel::before {
  background-color: lightcoral;
}

.btns-container button:hover::before {
  transition: all 500ms ease;
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  opacity: 1;
  left: 0;
  bottom: 0;
  z-index: -1;
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