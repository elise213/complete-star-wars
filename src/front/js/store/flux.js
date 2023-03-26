const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      current_front_url:
        "https://3000-4geeksacade-reactflaskh-fxbn4n58cbg.ws-us92.gitpod.io",
      current_back_url: process.env.BACKEND_URL,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      people: [],
      vehicles: [],
      planets: [],
      favorites: [],
      name: null,
      token: null,

      avatarID: null,
      avatarImages: [
        "fas fa-robot",
        "fas fa-user-astronaut",
        "fas fa-user-ninja",
        "fas fa-snowman",
        "fas fa-user-secret",
        "fas fa-hippo",
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
      getPerson: (index) => {
        const person = getStore().people;
        console.log("person from flux", person);
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

      deleteFavorite: (index) => {
        const favorites = getStore().favorites;
        let filtered = favorites.filter((f, i) => i !== index);
        setStore({ favorites: filtered });
      },

      addFavorite: (name) => {
        const favorite = getStore().favorites;
        favorite.push(name);
        setStore({ favorites: favorite });
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
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
    },
  };
};

export default getState;
