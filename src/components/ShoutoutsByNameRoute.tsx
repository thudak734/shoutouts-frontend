import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Item from "../models/Item";
import QueryStringParams from "../models/QueryStringParams";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/shoutoutServices";
import AddShoutoutForm from "./AddShoutoutForm";
import Card from "./Card";
import "./ShoutoutsByNameRoute.css";

const ShoutoutsByNameRoute = () => {
  const [shoutouts, setShoutouts] = useState<Item[]>([]);

  const name: string | undefined = useParams().name;

  const getAndSetShoutouts = (params: QueryStringParams): void => {
    getShoutouts(params).then((response) => {
      setShoutouts(response);
    });
  };

  const addShoutoutHandler = (shoutout: Item): void => {
    addShoutout(shoutout).then((response) => {
      getAndSetShoutouts({ to: name });
    });
  };

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  useEffect(() => {
    getAndSetShoutouts({ to: name });
  }, [name]);

  //we pass name down to the form so that it can autofill.
  return (
    <div className="ShoutoutsByNameRoute">
      <h2>Shoutouts by {name}</h2>
      <Link to="/">Back to All Shoutouts</Link>
      <AddShoutoutForm onAddShoutout={addShoutoutHandler} name={name!} />
      <ul>
        {shoutouts.map((shoutout) => {
          return (
            <Card
              shoutoutItem={shoutout}
              key={shoutout._id}
              onDeleteShoutout={deleteShoutoutHandler}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ShoutoutsByNameRoute;
