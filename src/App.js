import React from "react";
import "./App.css";

import Game from "./components/Game";
import Rules from "./components/About";

function App() {
  return (
    <div className="App">
      <h1 className="title">Game of Life</h1>
      <Rules />
      <Game />
    </div>
  );
}

export default App;
