import './css/App.css';
import { Client } from '@stomp/stompjs';
import { Navigate, Route, Routes } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { HomePage } from "./pages/HomePage";

const client = new Client({ brokerURL: `ws://${process.env.REACT_APP_SERVER_ADDRESS}/ws` }); // Creates new STOMP client

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chess/local" element={<GamePage local multi />} />
      <Route path="/chess/computer" element={<GamePage local single />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  );
}
// "/" is bound to the HomePage
// "/chess/local" is bound to a local multiplayer game
// "/chess/computer" is bound to a local singleplayer game

export { App, client };
