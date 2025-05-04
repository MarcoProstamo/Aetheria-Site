import React, { useState } from "react";

const GRID_SIZE = 5;
const BOMB_COUNT = 5;

function generateGrid() {
  const grid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill({ hasBomb: false, revealed: false }));

  let placed = 0;
  while (placed < BOMB_COUNT) {
    const r = Math.floor(Math.random() * GRID_SIZE);
    const c = Math.floor(Math.random() * GRID_SIZE);
    if (!grid[r][c].hasBomb) {
      grid[r][c] = { ...grid[r][c], hasBomb: true };
      placed++;
    }
  }

  return grid;
}

export default function CampoClownato() {
  const [grid, setGrid] = useState(generateGrid);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = (r, c) => {
    if (gameOver || grid[r][c].revealed) return;

    const newGrid = grid.map((row, ri) =>
      row.map((cell, ci) =>
        ri === r && ci === c ? { ...cell, revealed: true } : cell
      )
    );

    setGrid(newGrid);

    if (grid[r][c].hasBomb) {
      setGameOver(true);
      setMessage("💥 BOOM! Hai calpestato una torta in faccia!");
    }
  };

  const resetGame = () => {
    setGrid(generateGrid());
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="d-grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 3rem)`,
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <button
              key={`${rIdx}-${cIdx}`}
              onClick={() => handleClick(rIdx, cIdx)}
              className={`btn btn-sm ${
                cell.revealed
                  ? cell.hasBomb
                    ? "btn-danger"
                    : "btn-success"
                  : "btn-warning"
              }`}
              style={{ width: "3rem", height: "3rem" }}
            >
              {cell.revealed ? (cell.hasBomb ? "🎂" : "🎈") : ""}
            </button>
          ))
        )}
      </div>

      {message && (
        <div className="mt-3 alert alert-danger text-center fw-bold w-75">
          {message}
        </div>
      )}

      {gameOver && (
        <button onClick={resetGame} className="btn btn-primary mt-2">
          Rigioca!
        </button>
      )}
    </div>
  );
}
