import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.getItem("token") ? navigate("/") : "";
  }, [handleLogin]);

  function handleLogin(e) {
    e.preventDefault();
    actions.login(email, password);
  }
  return (
    <div className="login-container">
      <div className="m"></div>
      <div className="">
        <label for="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Password
        </label>

        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="button-back-container">
          <button className=" custom-button" onClick={(e) => handleLogin(e)}>
            Submit
          </button>
          <Link to="/register">Don't have an account?</Link>
        </div>
      </div>
    </div>
  );
};
