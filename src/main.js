import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "./index.css";

library.add(faSearch);

const app = createApp(App);

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGFVVi_t8NMc2gemQW7oLPbaarjIPSCEE",
  authDomain: "webdex-3008e.firebaseapp.com",
  projectId: "webdex-3008e",
  storageBucket: "webdex-3008e.appspot.com",
  messagingSenderId: "1092449272417",
  appId: "1:1092449272417:web:fad23950a2091ce06be020",
};

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.use(pinia)

initializeApp(firebaseConfig);

app.mount("#app");
