import React from "react";

const Rules = () => {
  return (
    <div className="rules">
      <div className="about">
        <h1>About Game</h1>
        <p>
          The Game of Life is a cellular automaton invented in 1970 by British
          mathematician, John Conway. It is a zero-player game, meaning that its
          evolution is determined by its initial state. It consists of a grid of
          cells that can live, die or multiply based on a set of mathematical
          rules. For more info go
          <a
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            target="_blank"
            rel="noopener noreferrer"
          >
            here!
          </a>
        </p>
      </div>
      <div>
        <h2>Cellular Automata</h2>
        <p>
          A cellular automaton is a discrete model studied in automata theory.
          Cellular automata are also called cellular spaces, tessellation
          automata, homogeneous structures, cellular structures, tessellation
          structures, and iterative arrays.
        </p>
        <p>
          Cellular automata have found application in various areas, including
          physics, theoretical biology and microstructure modeling.
        </p>
      </div>
      <div className="rules">
        <h2>Rules</h2>
        <div>
          Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        </div>
        <div>
          Any live cell with two or three live neighbours lives on to the next generation.
        </div>
        <div>
          Any live cell with more than three live neighbours dies, as if by overpopulation.
        </div>
        <div>
          Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        </div>
      </div>
    </div>
  );
};
export default Rules;
