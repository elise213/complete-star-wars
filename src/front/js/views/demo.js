import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [item, setItem] = useState({});
  const token = sessionStorage.getItem("token");
  const [type, setType] = useState(
    window.location.href.includes("person")
      ? "person"
      : window.location.href.includes("planet")
      ? "planet"
      : "vehicle"
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // actions.loadSomeData();
    setType(
      window.location.href.includes("person")
        ? "person"
        : window.location.href.includes("planet")
        ? "planet"
        : "vehicle"
    );
  }, []);

  useEffect(() => {
    if (type == "person") {
      console.log(type, params.index);
      fetch(`https://swapi.dev/api/people/${parseInt(params.index) + 1}`)
        .then((response) => response.json())
        .then((result) => {
          setItem(result);
          console.log(result);
        })
        .catch((error) => {
          console.log(error, "occurred at my fetch");
        });
    } else if (type == "planet") {
      fetch(`https://swapi.dev/api/planets/${parseInt(params.index) + 1}`)
        .then((response) => response.json())
        .then((result) => {
          setItem(result);
          console.log(result);
        })
        .catch((error) => {
          console.log(error, "occurred at my fetch");
        });
    } else {
      console.log("starship");
      fetch(`https://swapi.dev/api/starships/${parseInt(params.index) + 2}`)
        .then((response) => response.json())
        .then((result) => {
          setItem(result);
          console.log(result);
        })
        .catch((error) => {
          console.log(error, "occurred at my fetch");
        });
    }
  }, [type]);

  useEffect(() => {
    store.favorites.forEach((fave) => {
      if (fave.name == item.name) {
        setIsFavorite(true);
      }
      console.log("is favorite", isFavorite);
      console.log(fave.name, item);
    });
  }, [item]);

  function handleClick(e, fave) {
    e.preventDefault();
    actions.removeFavorite(fave);
    setIsFavorite(false);
  }

  console.log(params);
  console.log(item);
  let fields =
    item &&
    Object.keys(item).length &&
    (type == "person" ? (
      <div className="details-container row">
        <div className="col details-header">
          <p className="details-title">{item.name}</p>

          {token && isFavorite == false ? (
            <button
              className="custom-button"
              onClick={() => {
                actions.addFavorite(
                  item.name,
                  "/component/person",
                  params.index
                );
                setIsFavorite(true);
              }}
            >
              Add {item.name} To My Favorites
            </button>
          ) : token ? (
            <button
              className="custom-button"
              onClick={(e) => handleClick(e, item.name)}
            >
              Remove {item.name} From My Favorites
            </button>
          ) : null}
        </div>
        <div className="col">
          <img
            className="details-image"
            src={`https://starwars-visualguide.com/assets/img/characters/${
              parseInt(params.index) + 1
            }.jpg`}
          />
        </div>

        <hr />
        <div className="row justify-content-between">
          <div className="col-2">
            <p className="heading">Birth Year:</p>
            <p className="info">{item.birth_year}</p>
          </div>
          <div className="col-2">
            <p className="heading">Gender:</p>
            <p className="info">{item.gender}</p>
          </div>

          <div className="col-2">
            <p className="heading">Height:</p>
            <p className="info">{item.height}</p>
          </div>

          <div className="col-2">
            <p className="heading">Eye Color:</p>
            <p className="info">{item.eye_color}</p>
          </div>
        </div>
      </div>
    ) : type == "planet" ? (
      <div className="details-container row">
        <div className="col">
          <p className="details-title">{item.name}</p>
          {token && isFavorite == false ? (
            <button
              className="custom-button"
              onClick={() => {
                actions.addFavorite(
                  item.name,
                  "/component/planet",
                  params.index
                );
                setIsFavorite(true);
              }}
            >
              Add {item.name} To My Favorites
            </button>
          ) : token ? (
            <button
              className="custom-button"
              onClick={(e) => handleClick(e, item.name)}
            >
              Remove {item.name} From My Favorites
            </button>
          ) : null}
        </div>
        <div className="col">
          <img
            className="details-image"
            src={`https://starwars-visualguide.com/assets/img/planets/${
              parseInt(params.index) + 2
            }.jpg`}
          />
        </div>
        <hr />
        <div className="row justify-content-between">
          <div className="col-2">
            <p className="heading">Gravity:</p>
            <p className="info">{item.gravity}</p>
          </div>

          <div className="col-2">
            <p className="heading">Terrain:</p>
            <p className="info">{item.terrain}</p>
          </div>

          <div className="col-2">
            <p className="heading">Surface Water:</p>
            <p className="info"> {item.surface_water}</p>
          </div>

          <div className="col-2">
            <p className="heading">Population:</p>
            <p className="info">{item.population}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className="details-container row">
        <div className="col">
          <p className="details-title">{item.name}</p>
          {token && isFavorite == false ? (
            <button
              className="custom-button"
              onClick={() => {
                actions.addFavorite(
                  item.name,
                  "/component/vehicle",
                  params.index
                );
                setIsFavorite(true);
              }}
            >
              Add {item.name} To My Favorites
            </button>
          ) : token ? (
            <button
              className="custom-button"
              onClick={(e) => handleClick(e, item.name)}
            >
              Remove {item.name} From My Favorites
            </button>
          ) : null}
        </div>
        <div className="col">
          <img
            className="details-image"
            src={`https://starwars-visualguide.com/assets/img/starships/${
              parseInt(params.index) + 1
            }.jpg`}
          />
        </div>
        <hr />
        <div className="row justify-content-between">
          <div className="col-2">
            <p className="heading">Crew:</p>
            <p className="info">{item.crew}</p>
          </div>
          <div className="col-2">
            <p className="heading">Passengers:</p>
            <p className="info">{item.passengers}</p>
          </div>
          <div className="col-2">
            <p className="heading">Consumables:</p>
            <p className="info">{item.consumables}</p>
          </div>
          <div className="col-2">
            <p className="heading">Starship Class:</p>
            <p className="info">{item.starship_class}</p>
          </div>
          <div className="col-2">
            <p className="heading">Cargo Capacity:</p>
            <p className="info">{item.cargo_capacity}</p>
          </div>
        </div>
      </div>
    ));

  return <div className="details-page">{fields}</div>;
};
