import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Item from "../models/Item";
import "./Card.css";

//here we describe the props.
interface Props {
  shoutoutItem: Item;
  onDeleteShoutout: (id: string) => void;
}

const Card = ({ shoutoutItem, onDeleteShoutout }: Props) => {
  return (
    <li className="Card">
      <Link to={`user/${shoutoutItem.to}`}>
        <p>To: {shoutoutItem.to}</p>
      </Link>
      <img src={shoutoutItem.avatar} alt="image" />
      <p>
        From:
        {shoutoutItem.from}
      </p>

      <p>Shoutout: {shoutoutItem.text}</p>
      <img src={shoutoutItem.image} alt="" />
      <button onClick={() => onDeleteShoutout(shoutoutItem._id!)}>X</button>
    </li>
  );
};

export default Card;
