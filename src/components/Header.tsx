import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  //we need to know about context to add the login stuff.
  const { user } = useContext(AuthContext);

  // const name: string | undefined = useParams().name;
  //if user is truthy we want to show the sign out button. else,
  return (
    <header className="Header">
      <h1>Shoutouts</h1>
      <Link to="/me">Me</Link>

      {user ? (
        <div>
          <p>{user.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In</button>
      )}
    </header>
  );
};

export default Header;
