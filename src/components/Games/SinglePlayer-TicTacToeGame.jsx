import React, { useState, useEffect, useCallback } from "react";

// Game constants
const initialBoard = Array(9).fill(null);
const playerSymbol = "X";
const aiSymbol = "O";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Utility: Check winner
function checkWinner(board) {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Utility: Check draw
function checkDraw(board) {
  return board.every(cell => cell !== null);
}

// Component
export default function SinglePlayerTicTacToeGame() {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [winningCells, setWinningCells] = useState([]);

  const makeMove = useCallback((index, symbol) => {
    if (board[index] || winner || draw) return;

    const newBoard = [...board];
    newBoard[index] = symbol;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      const winCombo = winningCombinations.find(
        ([a, b, c]) =>
          newBoard[a] === gameWinner &&
          newBoard[b] === gameWinner &&
          newBoard[c] === gameWinner
      );
      setWinningCells(winCombo || []);
    } else if (checkDraw(newBoard)) {
      setDraw(true);
    }
  }, [board, winner, draw]);

  const minimax = useCallback((newBoard, currentPlayer) => {
    const availSpots = newBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter(i => i !== null);

    const winnerCheck = checkWinner(newBoard);
    if (winnerCheck === playerSymbol) return { score: -10 };
    if (winnerCheck === aiSymbol) return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };

    const moves = [];

    for (const i of availSpots) {
      const move = {};
      move.index = i;
      newBoard[i] = currentPlayer;

      const result =
        currentPlayer === aiSymbol
          ? minimax(newBoard, playerSymbol)
          : minimax(newBoard, aiSymbol);
      move.score = result.score;

      newBoard[i] = null; // Undo move
      moves.push(move);
    }

    let bestMove;
    if (currentPlayer === aiSymbol) {
      let bestScore = -Infinity;
      for (const move of moves) {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
      return bestMove;
    } else {
      let bestScore = Infinity;
      for (const move of moves) {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
      return bestMove;
    }
  }, []);

  // AI move effect
  useEffect(() => {
    if (!isPlayerTurn && !winner && !draw) {
      const timer = setTimeout(() => {
        const bestMove = minimax([...board], aiSymbol);
        if (bestMove && bestMove.index !== undefined) {
          makeMove(bestMove.index, aiSymbol);
          setIsPlayerTurn(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner, draw, makeMove, minimax]);

  // Player move
  const handleClick = index => {
    if (isPlayerTurn && !board[index] && !winner && !draw) {
      makeMove(index, playerSymbol);
      setIsPlayerTurn(false);
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setWinner(null);
    setDraw(false);
    setWinningCells([]);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Single Player Tic Tac Toe</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "5px",
          marginBottom: "15px",
        }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "2rem",
              cursor: cell || winner || draw ? "default" : "pointer",
              backgroundColor: winningCells.includes(idx)
                ? "#90ee90"
                : "white",
              border: "1px solid #ccc",
            }}
            disabled={!!cell || !!winner || draw}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && <h3>Winner: {winner === playerSymbol ? "You" : "AI"}</h3>}
      {draw && !winner && <h3>It's a Draw!</h3>}
      {!winner && !draw && (
        <h4>{isPlayerTurn ? "Your turn" : "AI is thinking..."}</h4>
      )}

      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Restart Game
      </button>
    </div>
  );
}
