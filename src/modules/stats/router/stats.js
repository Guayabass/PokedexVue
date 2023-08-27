import Main from "../views/MainPokemon.vue";
import SpritePokemon from "../components/PokemonSprite.vue";
import StatsPokemon from "../components/PokemonStats.vue";

export default [
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
      },
    ],
  },
];
