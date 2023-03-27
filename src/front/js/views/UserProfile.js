import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Favorites from "../component/Favorites.jsx";

export const UserProfile = () => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      <Favorites />
    </div>
  );
};
