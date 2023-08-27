import FavoritePokemon from "../views/FavoritePokemon.vue";

export default [
  {
    path: "/pokemon/favorites",
    name: "favorites",
    component: FavoritePokemon,
    meta: {
      requiresAuth: true,
    },
  },
];
