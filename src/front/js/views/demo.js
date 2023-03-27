import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [item, setItem] = useState({});
  const [type, setType] = useState(
    window.location.href.includes("person")
      ? "person"
      : window.location.href.includes("planet")
      ? "planet"
      : "vehicle"
  );

  useEffect(() => {
    // actions.loadSomeData();
    setType(
      window.location.href.includes("person")
        ? "person"
        : window.location.href.includes("planet")
        ? "planet"
        : "vehicle"
    );
  }, []);

  useEffect(() => {
    if (type == "person") {
      console.log(type, params.index);
      fetch(`https://swapi.dev/api/people/${parseInt(params.index) + 1}`)
        .then((response) => response.json())
        .then((result) => {
          setItem(result);
          console.log(result);
        })
        .catch((error) => {
          console.log(error, "occurred at my fetch");
        });
    } else if (type == "planet") {
      fetch(`https://swapi.dev/api/planets/${parseInt(params.index) + 1}`)
        .then((response) => response.json())
        .then((result) => {
          setItem(result);
          console.log(result);
        })
        .catch((error) => {
          console.log(error, "occurred at my fetch");
        });
    } else {
      console.log("starship");
      fetch(`https://swapi.dev/api/starships/${parseInt(params.index) + 2}`)
        .then((response) => response.json())
        .then((result) => {
          setItem(result);
          console.log(result);
        })
        .catch((error) => {
          console.log(error, "occurred at my fetch");
        });
    }
  }, [type]);
  console.log(params);
  console.log(item);
  let fields =
    item &&
    Object.keys(item).length &&
    (type == "person" ? (
      <div className="details-container row">
        <div className="col">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${
              parseInt(params.index) + 1
            }.jpg`}
          />
        </div>
        <div className="col">
          <h1>{item.name}</h1>
          <p className="">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quin voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi
          </p>
        </div>
        <hr />
        <div className="row">
          <div className="col-2 text-danger">{item.name}</div>
          <div className="col-2 text-danger">{item.birth_year}</div>
          <div className="col-2 text-danger">{item.gender}</div>
          <div className="col-2 text-danger">{item.height}</div>
          <div className="col-2 text-danger">{item.skin_color}</div>
          <div className="col-2 text-danger">{item.eye_color}</div>
        </div>
      </div>
    ) : type == "planet" ? (
      <div className="details-container row">
        <div className="col">IMAGE</div>
        <div className="col">
          <h1>{item.name}</h1>
          <p className="">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quin voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi
          </p>
        </div>
        <hr />
        <div className="row">
          <div className="col-2 text-danger">{item.name}</div>
          <div className="col-2 text-danger">{item.orbit}</div>
          <div className="col-2 text-danger">{item.gravity}</div>
          <div className="col-2 text-danger">{item.terrain}</div>
          <div className="col-2 text-danger">{item.surface_water}</div>
          <div className="col-2 text-danger">{item.population}</div>
        </div>
      </div>
    ) : (
      <div className="details-container row">
        <div className="col">
          <img
            src={`https://starwars-visualguide.com/assets/img/placeholder.jpg`}
          />{" "}
        </div>
        <div className="col">
          <h1>{item.name}</h1>
          <p className="">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quin voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi
          </p>
        </div>
        <hr />
        <div className="row">
          <div className="col-2 text-danger">{item.name}</div>
          <div className="col-2 text-danger">{item.crew}</div>
          <div className="col-2 text-danger">{item.passengers}</div>
          <div className="col-2 text-danger">{item.consumables}</div>
          <div className="col-2 text-danger">{item.starship_class}</div>
          <div className="col-2 text-danger">{item.cargo_capacity}</div>
        </div>
      </div>
    ));
  return <div>{fields}</div>;
};
