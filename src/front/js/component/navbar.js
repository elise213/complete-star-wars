import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light d-flex">
      <Link className=" col-1" to="/">
        <span className="navbar-brand mb-0 h1">
          <img className="img-fluid" src={logo} />
        </span>
      </Link>
      <div className="">
        <div>
          <Link className="login-link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};
