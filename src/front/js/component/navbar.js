import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light d-flex">
      <Link className=" col-1" to="/">
        <span className="navbar-brand mb-0 h1">
          <img
            className="img-fluid col-10"
            src="https://1000logos.net/wp-content/uploads/2017/06/Star-Wars-Logo.jpg"
          />
        </span>
      </Link>
      <div className="">
        <div className="dropdown">
          <Link to="/login">Login</Link>
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
        </div>
      </div>
    </nav>
  );
};
