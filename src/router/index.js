import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "../views/LandingPage.vue";
import statsRoutes from "@/modules/stats/router/stats";
import shareRoutes from "@/modules/share/router/share";
import favoriteRoutes from "@/modules/favorites/router/favorite";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const mainRoutes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/:pathMatch(.*)*",
    component: Home,
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
  //   {
  //     path: "/pokemon",
  //     name: "Main",
  //     component: Main,
  //     children: [
  //         {
  //             path: ":name",
  //             name: "PokemonSprite",
  //             component: SpritePokemon,
  //             props: true,
  //         },
  //         {
  //             path: ":name/stats",
  //             name: "PokemonStats",
  //             component: StatsPokemon,
  //             props: true,
  //         }
  //     ],
  //   },
  //   {
  //     path: "/pokemon/:name/share",
  //     name: "Share",
  //     component: ViewPokemon,
  //     props: true,
  //   },
  //   {
  //     path: "/pokemon/favorites",
  //     name: "favorites",
  //     component: FavoritePokemon,
  //     meta: {
  //       requiresAuth: true,
  //     }
  //   }
];

// const allRoutes = routes.concat(statsRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...mainRoutes, ...statsRoutes, ...favoriteRoutes, ...shareRoutes]
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
