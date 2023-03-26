import React, { useContext, useState } from "react";
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
      <li className="list-group-item border-0">{props.person.gender}</li>
      <li className="list-group-item border-0">{props.person.hair_color}</li>
      <li className="list-group-item border-0">{props.person.eye_color}</li>
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
      <li className="list-group-item border-0">{props.planet.gravity}</li>
      <li className="list-group-item border-0">{props.planet.climate}</li>
      <li className="list-group-item border-0">{props.planet.terrain}</li>
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
      <li className="list-group-item border-0">{props.vehicle.model}</li>
      <li className="list-group-item border-0">{props.vehicle.crew}</li>
      <li className="list-group-item border-0">{props.vehicle.pilots}</li>
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
            <span href="#" className="btn btn-outline-primary">
              Learn More!
            </span>
          </Link>
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() => {
              actions.addFavorite(name);
              setLiked(!liked);
            }}
          >
            <i className={`${liked ? "fas" : "far"} fa-heart`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
