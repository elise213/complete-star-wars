import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [name, setName] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    actions.createUser(is_org, name, email, password, userAvatar);
    setLog(true);
  }
  function handleSelectImage(id) {
    store.avatarImages.forEach((i, idx) => {
      let img = document.querySelector(`#avatar${idx}`);
      img.classList.remove("avatarImageSelected");
    });
    let newselect = document.querySelector(`#avatar${id}`);
    newselect.classList.add("avatarImageSelected");
    setUserAvatar(id);
  }

  return (
    <div className="register-container">
      <div className="mb-3">
        <label for="InputEmail1" className="form-label">
          Name
        </label>
        <input
          type="email"
          className="form-control"
          id="InputEmail1"
          aria-describedby="emailHelp"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label for="InputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="InputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label for="InputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="InputPassword1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <Link to="/register">Don't have an account?</Link>
      </div>
      <div className="mb-3">
        <p>pick your avatar</p>
        {store.avatarImages.map((i, idx) => {
          return (
            <span
              className={`${i} avatarImages`}
              id={"avatar" + idx}
              onClick={() => handleSelectImage(idx)}
            />
          );
        })}
      </div>
      <div style={{ width: "100%", textAlign: "center", height: "3rem" }}>
        <a className="" onClick={() => setLog(true)}>
          Go Back to login
        </a>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => handleRegister(e)}
      >
        Register
      </button>
    </div>
  );
};
