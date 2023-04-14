import { defineStore } from "pinia";
import axios from "axios";
import { localhostApi } from "../exports/nestapi.js";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLoggedIn: false,
    username: "none",
    password: "none",
    //favoriteID: 0, //make localstorage to be able to delete pokemon always
    userId: 0,
    favorites: [],
    //repassword: "",
    //errorMessage: "",
  }),
  getters: {},
  actions: {
    async deleteFavorite(id) {
      let favoriteID;
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
          const index = this.favorites.findIndex(i => i.id === id);
          //console.log(index)
          if (index > -1) { // only splice array when item is found
            this.favorites.splice(index, 1); // 2nd parameter means remove one item only
          }
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
    async addFavorite(name, id) {
      if (this.isLoggedIn){
      const fav = {
        pokemonID: id,
        pokemonName: name,
        user: this.userId,
      };
      await axios
        .post(localhostApi + "favorites", fav)
        .then((response) => {
          console.log(response)
          console.log('added to favorites!')
        })
        .catch((error) => {
          console.log(error.code);
          //alert(error.message);
        });
      } else {
        alert('Please make sure that you login/register before you can add favorites!')
      }
    },
    setUserId(id) {
      this.userId = id;
    },
  },
  persist: [
    {
      paths: ["isLoggedIn", "username", "password", "userId", "favorites"],
      storage: sessionStorage,
    },
  ],
});
