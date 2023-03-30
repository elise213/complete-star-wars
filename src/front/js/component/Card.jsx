import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Card = (props) => {
  const { store, actions } = useContext(Context);
  const [liked, setLiked] = useState(false);


  let typeURL = props.person
    ? "/component/person/"
    : props.planet
    ? "/component/planet/"
    : "/component/vehicle/";
  let name = props.person
    ? props.person.name
    : props.planet
    ? props.planet.name
    : props.vehicle.name;
  useEffect(()=> {
      store.favorites.forEach((fave)=> {
        if (fave.name == name) {
          setLiked(true);
        }
      } )
    },[])
  let personProp = props.person && (
    <div>
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${
          props.id + 1
        }.jpg`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.person.name}</h5>
      </div>
    </div>
  );

  let planetProp = props.planet && (
    <div>
      <img
        src={`https://starwars-visualguide.com/assets/img/planets/${
          props.id + 2
        }.jpg`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.planet.name}</h5>
      </div>

    </div>
  );

  let vehicleProp = props.vehicle && (
    <div>
      <img
        src={`https://starwars-visualguide.com/assets/img/placeholder.jpg`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.vehicle.name}</h5>
      </div>
    </div>
  );

  return (
    <div className="container-card">
      <div className="card">
        {props.person ? personProp : ""}
        {props.planet ? planetProp : ""}
        {props.vehicle ? vehicleProp : ""}
        <div className="card-body d-flex justify-content-between">
          <Link to={typeURL + props.id}>
            <button href="#" className="custom-button">
              Learn More
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-liked"
            onClick={() => {
              actions.addFavorite(name, typeURL, props.id);
              setLiked(!liked);
            }}
          >
            <i
              className={`heart ${liked ? "fas" : "far"} fa-heart`}
              style={{ color: "lightgreen", fontSize: "x-large" }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
