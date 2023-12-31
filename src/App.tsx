import './css/App.css';
import { Client } from '@stomp/stompjs';
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Game } from "./components/Game";

// const client = new Client({ brokerURL: `ws://localhost:8080/ws` }); // Creates new STOMP client
const client = new Client({ brokerURL: `ws://129.153.57.236:8080/ws` }); // Creates new STOMP client

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chess" element={<Game/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  );
}
// "/" is bound to the HomePage
// "/chess/local" is bound to a local multiplayer game
// "/chess/computer" is bound to a local singleplayer game


export { App, client };
