import SharePokemon from "../views/ViewPokemon.vue";

export default [
  {
    path: "/pokemon/:name/share",
    name: "Share",
    component: SharePokemon,
    props: true,
  },
];
