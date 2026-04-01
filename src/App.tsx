import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import UserList from "./pages/UserList/UserList";
import TravelTracker from "./pages/TravelTracker/TravelTracker";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>

        {/* Botón para ir a User List */}
        <div style={{ marginTop: "20px" }}>
          <Link to="/user-list">
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#646cff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Ver Lista de Usuarios
            </button>
          </Link>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link to="/travel-tracker">
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#646cff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Travel Tracker
            </button>
          </Link>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/travel-tracker" element={<TravelTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
