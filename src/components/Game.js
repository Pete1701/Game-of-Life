import React, { useState, useCallback, useRef } from "react";
// immer help us to make immutable state for the grid
import produce from "immer";

let numRows = 25;
let numCols = 25;

// to avoid duplicated if statements
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

// Generate Grid
const createGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

// -- MAIN FUNCTION COMPONENT
const Game = () => {
  // -- state
  const [grid, setGrid] = useState(() => {
    return createGrid();
  });

  // store in state if the simulation is currently running or not
  const [running, setRunning] = useState(false);
  //create a referece for  running state. Because running will change while our funtion won't change on every render
  const runningRef = useRef(running);
  runningRef.current = running;

  // change the generated cells on the grid
  const [generation, setGeneration] = useState(0);
  const generationRef = useRef(generation);
  generationRef.current = generation;

  // set costum speed
  const [speed, setSpeed] = useState(500);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  // set costum grid size
  const [size, setSize] = useState("25x25");
  const sizeRef = useRef(size);
  sizeRef.current = size;

  // -- ALGORITHM

  //useCallback hook so the function doesn't run on every render
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    // -- simulation
    // I need a double for loop, one to loop throught the rows and another to loop throught the columns
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(() => {
      setGeneration(generationRef.current + 1);
      runSimulation();
    }, speedRef.current);
  }, []);

  // Change Grid Size
  const changeSize = (e) => {
    setSize(e.target.value);
    if (e.target.value === "25x25") {
      numRows = 25;
      numCols = 25;
    } else if (e.target.value === "35x35") {
      numRows = 35;
      numCols = 35;
    } else if (e.target.value === "45x45") {
      numRows = 45;
      numCols = 45;
    }
    setGrid(createGrid);
  };

  // Random Grid
  const randomGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0))
      );
    }
    setGrid(rows);
  };

  // -- STRUCTURE
  return (
    <>
      <div className="buttons">
        <select
          id="size"
          onChange={changeSize}
          value={size}
          className="selection-menu"
        >
          <option>Change size</option>
          <option value="25x25" name="25x25">
            25 x 25
          </option>
          <option value="35x35" name="35x35">
            35 X 35
          </option>
          <option value="45x45" name="45x45">
            45 X 45
          </option>
        </select>
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              console.log(runningRef);
              runSimulation();
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>
        <button
          onClick={() => {
            runSimulation();
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            setGrid(createGrid());
            setGeneration(0);
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            randomGrid();
          }}
        >
          Random
        </button>
        {running ? (
          <button
            onClick={() => {
              setSpeed(1000);
            }}
          >
            Slow
          </button>
        ) : (
          <button>Slow</button>
        )}
        {running ? (
          <button
            onClick={() => {
              setSpeed(500);
            }}
          >
            Normal
          </button>
        ) : (
          <button>Normal</button>
        )}
        {running ? (
          <button
            onClick={() => {
              setSpeed(100);
              runSimulation();
            }}
          >
            Fast
          </button>
        ) : (
          <button>Fast</button>
        )}
      </div>
      <div className="cellGrid">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 20px)`,
            width: "100%",
          }}
        >
          {grid.map((rows, rowIndex) =>
            rows.map((col, colIndex) => (
              <div
                key={`${rowIndex} - ${colIndex}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    // click enables desables the pink color (sets the cell to be alive or dead)
                    gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex]
                      ? 0
                      : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[rowIndex][colIndex]
                    ? " #86af49"
                    : undefined,
                  border: "solid 1px black",
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
