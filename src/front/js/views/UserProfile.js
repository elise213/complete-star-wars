import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const UserProfile = () => {
  const { store, actions } = useContext(Context);
  return <div>Hello.</div>;
};
