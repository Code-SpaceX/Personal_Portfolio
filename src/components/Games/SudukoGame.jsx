"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// ============================
// Core Sudoku Logic
// ============================

const isValid = (grid, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
    const gridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const gridCol = 3 * Math.floor(col / 3) + (i % 3);
    if (grid[gridRow][gridCol] === num) return false;
  }
  return true;
};

const generateFullSudoku = () => {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  const fillGrid = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const nums = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
          for (const num of nums) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (fillGrid(grid)) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  fillGrid(grid);
  return grid;
};

const hasUniqueSolution = (grid) => {
  let solutionCount = 0;
  const solve = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (solve(grid)) {
                solutionCount++;
                if (solutionCount > 1) return false;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  solve(grid);
  return solutionCount === 1;
};

const removeNumbers = (grid, difficulty) => {
  let attempts = difficulty === "easy" ? 20 : difficulty === "medium" ? 35 : 50;
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (grid[row][col] !== 0) {
      const backup = grid[row][col];
      grid[row][col] = 0;
      const gridCopy = grid.map((r) => [...r]);
      if (!hasUniqueSolution(gridCopy)) {
        grid[row][col] = backup;
      } else {
        attempts--;
      }
    }
  }
  return grid;
};

// ============================
// Main React Component
// ============================

export default function SudokuGame() {
  const [sudoku, setSudoku] = useState([]);
  const [initialSudoku, setInitialSudoku] = useState([]);
  const [sudokuAns, setSudokuAns] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (!isTimerActive) {
      setIsTimerActive(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  }, [isTimerActive]);

  const stopTimer = useCallback(() => {
    setIsTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const formatTime = (t) => {
    return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
  };

  const generateSudoku = useCallback(() => {
    const full = generateFullSudoku();
    setSudokuAns(full.map((r) => [...r]));
    return removeNumbers(full, difficulty);
  }, [difficulty]);

  useEffect(() => {
    const puzzle = generateSudoku();
    setSudoku(puzzle);
    setInitialSudoku(puzzle.map((r) => [...r]));
    setTime(0);
    stopTimer();
    setMessage("");
  }, [difficulty, generateSudoku, stopTimer]);

  const handleCellClick = (row, col) => {
    if (initialSudoku[row][col] === 0) {
      setSelectedCell([row, col]);
      startTimer();
    }
  };

  const handleNumberSelect = (num) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      const newSudoku = sudoku.map((r) => [...r]);
      newSudoku[row][col] = num;
      setSudoku(newSudoku);
    }
  };

  const checkSolution = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (sudoku[r][c] !== sudokuAns[r][c]) {
          setMessage(`Error at row ${r + 1}, col ${c + 1}. Try again.`);
          return;
        }
      }
    }
    stopTimer();
    setMessage("🎉 Correct! Great job!");
  };

  return (
    <div style={styles.container}>
      <h1>Sudoku Game</h1>

      <div style={styles.difficulty}>
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            style={{
              ...styles.diffButton,
              backgroundColor: difficulty === level ? "#a0f0a0" : "#ffffaa",
            }}
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={styles.timer}>
        <p style={{ fontSize: "1.2rem", color: "#D14D72" }}>{formatTime(time)}</p>
      </div>

      <table style={styles.grid}>
        <tbody>
          {sudoku.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => {
                const isFixed = initialSudoku[rIdx][cIdx] !== 0;
                const isSelected = selectedCell?.[0] === rIdx && selectedCell?.[1] === cIdx;
                return (
                  <td
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    style={{
                      ...styles.cell,
                      fontWeight: isFixed ? "bold" : "normal",
                      backgroundColor: isSelected ? "#cfe3ff" : isFixed ? "#eee" : "#fff",
                      color: isFixed ? "#000" : "#D14D72",
                      border: "1px solid #888",
                      borderTop: rIdx % 3 === 0 ? "2px solid black" : undefined,
                      borderLeft: cIdx % 3 === 0 ? "2px solid black" : undefined,
                      borderRight: (cIdx + 1) % 3 === 0 ? "2px solid black" : undefined,
                      borderBottom: (rIdx + 1) % 3 === 0 ? "2px solid black" : undefined,
                    }}
                  >
                    {cell !== 0 ? cell : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.numberRow}>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <button key={num} onClick={() => handleNumberSelect(num)} style={styles.numBtn}>
            {num}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button onClick={checkSolution} style={styles.checkBtn}>
          Check Solution
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

// ============================
// Inline Styles
// ============================
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "sans-serif"
  },
  difficulty: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem"
  },
  diffButton: {
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    border: "1px solid black",
    cursor: "pointer"
  },
  grid: {
    borderCollapse: "collapse",
    marginBottom: "1rem"
  },
  cell: {
    width: "45px",
    height: "45px",
    textAlign: "center",
    fontSize: "18px",
    cursor: "pointer",
    userSelect: "none"
  },
  numberRow: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem"
  },
  numBtn: {
    width: "40px",
    height: "40px",
    fontSize: "16px",
    cursor: "pointer"
  },
  timer: {
    marginBottom: "1rem"
  },
  checkBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#90ee90",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
