import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Item from "../models/Item";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/shoutoutServices";
import AddShoutoutForm from "./AddShoutoutForm";
import Card from "./Card";
import "./HomeRoute.css";

//we need useEffect.

//we want to get our shoutouts

const HomeRoute = () => {
  const { user } = useContext(AuthContext);
  const [shoutout, setShoutout] = useState<Item[]>([]);

  // const [searchParams] = useSearchParams(); hook where we grab what is in the url
  //   const to: string | null = searchParams.get("to"); //this is waht is in our url and we are setting it to a variable.
  //   const from: string | null = searchParams.get("from");
  //   const shoutout: string | null = searchParams.get("shoutout");

  //   const queryStringParams: QueryStringParams = {
  // ...(to ? { prefix: to } : {}),
  // ...(from ? { from } : {}),
  // ...(shoutout ? { shoutout } : {}),
  //   };
  //we dont want to repeat ourselves so we make a function that gets shoutouts and sets shouts
  const getAndSetShoutouts = () => {
    getShoutouts({}).then((response) => {
      setShoutout(response);
    });
  };

  //this function: addShoutout communicates with an api. we made that to comm with mongo.
  //we handle the promise with .then. after it is done working with mongo we set the new state.
  const addShoutoutHandler = (shoutout: Item): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts();
    });
  };

  const deleteShoutoutHandler = async (id: string) => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts();
    });
  };
  //on the homepage we want all of the shoutouts.
  //after we have set this up we go up and start working on setting up state
  useEffect(() => {
    getShoutouts({}).then((response) => {
      setShoutout(response);
    });
  }, []);

  //   useEffect(() => {
  //     getAndSetShoutouts(queryStringParams);
  //   }, []);

  //name satarts as empty
  return (
    <div className="HomeRoute">
      <h2>All Shoutouts</h2>
      {user ? (
        <AddShoutoutForm onAddShoutout={addShoutoutHandler} name="" />
      ) : (
        <div>
          <p>Sign in to Leave a Shoutout</p>
          <button onClick={signInWithGoogle}>Sign in</button>
        </div>
      )}

      <ul>
        {shoutout.map((item) => (
          <Card
            key={item._id}
            shoutoutItem={item}
            onDeleteShoutout={deleteShoutoutHandler}
          />
        ))}
      </ul>
    </div>
  );
};
//above - using the map method we can return an array and it can be returned as a list. i will refer to each thing as an item. I then return a shoutout card. in order to pass info down to the card, we do that with props. shoutoutItem is a props object. it is the key of the props object. which side referss to the actual data? the righthand side. Card wont be ready at this point.
export default HomeRoute;
