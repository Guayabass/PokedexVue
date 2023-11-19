import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { fbConfig } from "@/exports/fbConfig";

import "./index.css";

library.add(faSearch);

const app = createApp(App);

import { initializeApp } from "firebase/app";


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.use(pinia)

initializeApp(fbConfig);

app.mount("#app");
