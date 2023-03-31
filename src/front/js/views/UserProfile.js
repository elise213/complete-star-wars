import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Favorites from "../component/Favorites.jsx";
import { Link } from "react-router-dom";

const userProfile = () => {
  const { store, actions } = useContext(Context);
  // let link = store.avatarImages[parseInt(store.avatarID)];
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
      {/* <div className=""> */}
      <p className="yellow-text-title">{name}'s favorites</p>
      <ul className="favorites-list" style={{ listStyleType: "none" }}>
        {store.favorites.map((fave, i) => {
          console.log("fave = ", fave);
          return (
            <li key={i} className="">
              <Link
                className="yellow-text links"
                to={fave.typeURL + fave.index}
              >
                {fave.name}
              </Link>
              <a
                onClick={(e) => handleClick(e, fave.name)}
                className="delete-favorite ml-3"
              >
                x
              </a>
            </li>
          );
        })}
      </ul>
      {/* </div> */}
    </div>
  );
};

export default userProfile;
