import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Item from "../models/Item";
import { deleteShoutout, getShoutouts } from "../services/shoutoutServices";
import Card from "./Card";
import "./MeRoute.css";

const MeRoute = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Item[]>([]);
  const navigate = useNavigate();

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getShoutouts({ me: user?.displayName! }).then((response) => {
        setShoutouts(response);
      });
    });
  };

  useEffect(() => {
    if (user) {
      getShoutouts({ me: user.displayName! }).then((response) => {
        setShoutouts(response);
      });
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="MeRoute">
      <ul>
        {shoutouts.map((shoutout) => (
          <Card
            key={shoutout._id}
            shoutoutItem={shoutout}
            onDeleteShoutout={deleteShoutoutHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default MeRoute;
