import { createRouter, createWebHistory} from "vue-router";
import ViewPokemon from "../views/ViewPokemon.vue";
import SpritePokemon from "../components/PokemonSprite.vue";
import StatsPokemon from "../components/PokemonStats.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Main from "../views/MainPokemon.vue";
import Home from "../views/LandingPage.vue";
import FavoritePokemon from "../views/FavoritePokemon.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/:pathMatch(.*)*",
    //component: PathNotFound,
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/login",
    component: Home,
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        path: "/register",
        name: "register",
        component: Register,
      },
  ],
  },
  {
    path: "/pokemon",
    name: "Main",
    component: Main,
    children: [
        {
            path: ":name",
            name: "PokemonSprite",
            component: SpritePokemon,
            props: true,
        },
        {
            path: ":name/stats",
            name: "PokemonStats",
            component: StatsPokemon,
            props: true,
        }
    ],
  },
  {
    path: "/pokemon/:name/share",
    name: "Share",
    component: ViewPokemon,
    props: true,
  },
  {
    path: "/pokemon/favorites",
    name: "favorites",
    component: FavoritePokemon,
    meta: {
      requiresAuth: true,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => { //to avoid it thinking that we logged out on refresh
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()){
      next();
    } else {
      alert("You don't have access! Sign in or register first!")
      next('/home');
    }
  } else {
    next();
  }
})

export default router;
