import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("token");
  return (
    <nav className="navbar navbar-light bg-light d-flex">
      <Link className=" col-1" to="/">
        <span className="navbar-brand mb-0 h1">
          <img className="img-fluid" src={logo} />
        </span>
      </Link>
      {/* new */}
      {/* Logout- Only visible when logged in */}
      {/* Login/ Register- Only visible when NOT logged in */}
      {token ? (
        <div className="logged-in">
        <span className="nav-item">
          <span className="btn login-link" onClick={() => actions.logout()}>
            Logout
          </span>
        </span>
                  <Link to="/userProfile">
                  <span className="nav-btn nav-profile-icon">
                    <i className="fa-solid fa-circle-user"></i>
                  </span>
                </Link>
                </div>
      ) : (
        <div>
          <Link className="login-link" to="/login">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};
