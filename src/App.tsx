import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import HomeRoute from "./components/HomeRoute";
import Header from "./components/Header";
import ShoutoutsByNameRoute from "./components/ShoutoutsByNameRoute";
import MeRoute from "./components/MeRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/user/:name" element={<ShoutoutsByNameRoute />} />
          <Route path="/me" element={<MeRoute />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
