import { defineStore } from "pinia";
import axios from "axios";
import { localhostApi } from "../exports/nestapi.js";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLoggedIn: false,
    username: "none",
    password: "none",
    favoriteIDs: [],
    userId: 0,
    favorites: [],
    //repassword: "",
    //errorMessage: "",
  }),
  getters: {},
  actions: {
    async deleteFavorite(id, name) {
      let favoriteID;
      const index = this.favorites.findIndex((fav) => fav.id === id);
      await axios
        .get(localhostApi + "favorites/" + this.userId + "/" + id)
        .then((response) => {
          favoriteID = response.data[0].id;
        })
        .catch((error) => {
          console.log(error.code);
        });
      await axios
        .delete(localhostApi + "favorites/" + favoriteID)
        .then((response) => {
          //console.log(index);
          if (index > -1) {
            // only splice array when item is found
            this.favorites.splice(index, 1);
            this.favoriteIDs.splice(index, 1); // 2nd parameter means remove one item only
            alert("Removed " + this.capitalize(name) + " from favorites!");
          }
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
    async addFavorite(name, id) {
      if (this.isLoggedIn) {
        const fav = {
          pokemonID: id,
          pokemonName: name,
          user: this.userId,
        };
        await axios
          .post(localhostApi + "favorites", fav)
          .then((response) => {
            if (this.favorites.find((e) => e.id === id)) {
              console.log("Duplicate ID, not adding to array.");
            } else {
              const pokemon = {
                id: 0,
                name: "",
              };
              (pokemon.id = id),
                (pokemon.name = name),
                this.favoriteIDs.push(id);
              this.favorites.push(pokemon);
              alert("Added " + this.capitalize(name) + " to favorites!")
            }
          })
          .catch((error) => {
            console.log(error.code);
            //alert(error.message);
          });
      } else {
        alert(
          "Please make sure that you login/register before you can add favorites!"
        );
      }
    },
    setUserId(id) {
      this.userId = id;
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  persist: [
    {
      paths: [
        "isLoggedIn",
        "username",
        "password",
        "userId",
        "favorites",
        "favoriteIDs",
      ],
      storage: sessionStorage,
    },
  ],
});
