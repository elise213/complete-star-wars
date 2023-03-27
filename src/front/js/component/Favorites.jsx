import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Favorites = () => {
  <div className="dropdown">
    <button
      className="btn btn-primary dropdown-toggle"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Favorites
    </button>
    <ul
      className="dropdown-menu dropdown-menu-end"
      aria-labelledby="dropdownMenuButton1"
    >
      {store.favorites.map((fav, i) => {
        return (
          <a className="dropdown-item" key={i}>
            {fav}{" "}
            <i
              onClick={() => actions.deleteFavorite(i)}
              className="fas fa-trash"
            ></i>
          </a>
        );
      })}
    </ul>
  </div>;
};
export default Favorites;
