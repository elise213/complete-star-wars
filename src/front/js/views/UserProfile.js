import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Favorites from "../component/Favorites.jsx";
import { Link } from "react-router-dom";

const userProfile = () => {
  const { store, actions } = useContext(Context);
  let link = store.avatarImages[parseInt(store.avatarID)];
  let name = store.name;
  console.log("name is coming from user profile:" + name);
  let favorites = store.favorites;
  console.log(store.favorites);
  
  function handleClick(e, fave) {
    e.preventDefault();
    actions.removeFavorite(fave);
  }
  return (
    <div className="profile-container">
      <p className="profile-greeting pt-5">Welcome, {name}!</p>
      <span className={`${link} user-profile-avatar`}></span>
      <div className="user-profile-container">
        <div className="favorites-col">
          <p className="your-favorite-resources">Your Favorite Resources</p>
          <ul className="favorites-list" style={{ listStyleType: "none" }}>
            {store.favorites.map((fave, i) => {
              console.log("fave = ", fave);
              return (
                <li key={i} className="favorite-line-item">
                  <Link className="favorite-a-tag" to={fave.typeURL + fave.index}>
                    {fave.name}
                  </Link>
                  <a
                    onClick={(e) => handleClick(e, fave.name)}
                    className="delete-favorite mx-3"
                  >
                    x
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default userProfile;
