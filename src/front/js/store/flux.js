const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      current_front_url:
        "https://3000-lalafontain-completesta-8ppq60m9gxp.ws-eu93.gitpod.io",
      current_back_url: process.env.BACKEND_URL,
      people: [],
      vehicles: [],
      planets: [],
      favorites: [],
      name: null,
      token: null,
      avatarID: null,
      avatarImages: [
        "fas fa-user-astronaut",
        "fas fa-space-shuttle",
        "fas fa-satellite",
        "fas fa-meteor",
        "fab fa-jedi-order",
        "fas fa-robot",
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction

      loadSomeData: () => {
        console.log("I was called from load some data in flux");
        fetch("https://swapi.dev/api/people")
          .then((response) => response.json())
          .then((result) => {
            setStore({ people: result.results });
            console.log(result);
          })
          .catch((error) => {
            console.log(error, "occurred at my fetch");
          });
        fetch("https://swapi.dev/api/planets")
          .then((response) => response.json())
          .then((result) => setStore({ planets: result.results }))
          .catch((error) => {
            console.log(error, "occurred at my fetch");
          });
        fetch("https://swapi.dev/api/starships")
          .then((response) => response.json())
          .then((result) => setStore({ vehicles: result.results }))
          .catch((error) => {
            console.log(error, "occurred at my fetch");
          });
      },

      login: async (email, password) => {
        const current_back_url = getStore().current_back_url;
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const response = await fetch(current_back_url + "/api/login", opts);
          if (response.status !== 200) {
            alert("There has been an error");
            return false;
          }
          const data = await response.json();
          // console.log("data =", data);
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("name", data.name);
          let favoriteNames = [];
          data.favorites.forEach((favorite) => {
            favoriteNames.push(favorite);
          });

          setStore({
            token: data.access_token,
            avatarID: data.avatar,
            name: data.name,
            favorites: favoriteNames,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      logout: () => {
        const current_front_url = getStore().current_front_url;
        const token = sessionStorage.removeItem("token");
        const name = sessionStorage.removeItem("name");
        setStore({ token: null, name: null });
        window.location.href = current_front_url + "/";
      },

      getPerson: (index) => {
        const person = getStore().people;
        return person[index];
      },

      getPlanet: (index) => {
        const planet = getStore().planets;
        return planet[index];
      },

      getVehicle: (index) => {
        const vehicle = getStore().vehicles;
        return vehicle[index];
      },

      removeFavorite: (faveName) => {
        const current_back_url = getStore().current_back_url;
        const favorites = getStore().favorites;
        const token = getStore().token;
        if (sessionStorage.getItem("token")) {
          const opts = {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            method: "DELETE",
            body: JSON.stringify({
              name: faveName,
            }),
          };
          fetch(current_back_url + "/api/removeFavorite", opts)
            .then((response) => response.json())
            .then((data) => {
              if (data.message == "okay") {
                favorites.forEach((element, index) => {
                  if (element.name == faveName) {
                    favorites.splice(index, 1);
                  }
                });
                setStore({ favorites: favorites });
              }
            })
            .catch((error) => console.log(error));
        }
      },

      addFavorite: (name, typeURL, id) => {
        const current_back_url = getStore().current_back_url;
        const favorites = getStore().favorites;
        const token = sessionStorage.getItem("token");
        let favorite = {
          name: name,
          typeURL: typeURL,
          index: id,
        };
        if (sessionStorage.getItem("token")) {
          const opts = {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              name: name,
              typeURL: typeURL,
              index: id,
            }),
          };
          fetch(current_back_url + "/api/addFavorite", opts)
            .then((response) => response.json())
            .then((data) => {
              if (data.message == "okay") {
                favorites.push(favorite);
                setStore({ favorites: favorites });
              }
            });
        }
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      // getMessage: async () => {
      //   try {
      //     // fetching data from the backend
      //     const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
      //     const data = await resp.json();
      //     setStore({ message: data.message });
      //     // don't forget to return something, that is how the async resolves
      //     return data;
      //   } catch (error) {
      //     console.log("Error loading message from backend", error);
      //   }
      // },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      createUser: async (name, email, password, userAvatar) => {
        const current_back_url = getStore().current_back_url;
        const current_front_url = getStore().current_front_url;
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            userAvatar: userAvatar,
          }),
        };
        try {
          const response = await fetch(
            current_back_url + "/api/createUser",
            opts
          );
          if (response.status >= 400) {
            alert("There has been an error");
            return false;
          }
          const data = await response.json();
          if (data.status == "true") {
            console.log("relocate!!");
            window.location.href = current_front_url + "/login";
          }
          return true;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;
