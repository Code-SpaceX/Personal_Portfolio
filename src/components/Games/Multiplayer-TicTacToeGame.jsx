"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import io from "socket.io-client";

// Socket URL, fallback to localhost
const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"
);

const linesToCheck = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board) {
  for (let line of linesToCheck) {
    const [a, b, c] = line;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}

const MultiplayerTicTacToe = () => {
  // State variables
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameNumber, setGameNumber] = useState("");
  const [currentGame, setCurrentGame] = useState(null);
  const [status, setStatus] = useState("");
  const [mySymbol, setMySymbol] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);
  const [optionNewGame, setOptionNewGame] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Clear status message after 10 seconds
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 10000);
    return () => clearTimeout(timer);
  }, [status]);

  const reset = useCallback(
    (userInitiated = true) => {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      if (userInitiated && currentGame) {
        socket.emit("resetGame", currentGame);
      }
    },
    [currentGame]
  );

  // Setup socket event listeners
  useEffect(() => {
    socket.on("move", ({ gameNumber: gNum, index, symbol }) => {
      if (gNum !== currentGame) return; // ignore if not current game
      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[index] = symbol;
        return newBoard;
      });
      setIsXNext(symbol !== "X");
    });

    socket.on("gameCreated", ({ gameNumber }) => {
      setCurrentGame(gameNumber);
      setStatus(`Game created. Your game number is ${gameNumber}`);
    });

    socket.on("gameJoined", ({ gameNumber }) => {
      setCurrentGame(gameNumber);
      setStatus(`Joined game ${gameNumber}`);
    });

    socket.on("userJoined", ({ userId }) => {
      setHasStarted(true);
      setStatus(`User ${userId} joined the game`);
      setGameStarted(true);
    });

    socket.on("resetGame", () => {
      reset(false);
    });

    socket.on("error", (error) => {
      setStatus(`Error: ${error}`);
    });

    return () => {
      socket.off("move");
      socket.off("gameCreated");
      socket.off("gameJoined");
      socket.off("userJoined");
      socket.off("resetGame");
      socket.off("error");
    };
  }, [currentGame, reset]);

  const handleClick = (index) => {
    if (!currentGame) {
      setStatus("Create or join a game first!");
      return;
    }
    if (!hasStarted) {
      setStatus("Please wait for opponent to join");
      return;
    }
    if (board[index] || calculateWinner(board)) return;

    if (isXNext && mySymbol !== "X") {
      setStatus("Please wait for opponent's move");
      return;
    }
    if (!isXNext && mySymbol !== "O") {
      setStatus("Please wait for opponent's move");
      return;
    }

    const symbol = isXNext ? "X" : "O";
    socket.emit("move", { gameNumber: currentGame, index, symbol });
  };

  const handleCreateGame = () => {
    setMySymbol("X");
    socket.emit("createGame");
    setOptionNewGame(true);
    setOptionSelected(true);
  };

  const handleJoinGame = () => {
    if (!gameNumber.trim()) return setStatus("Please enter a game code");
    setMySymbol("O");
    socket.emit("joinGame", gameNumber.trim());
    setGameStarted(true);
    setOptionSelected(true);
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((cell) => cell !== null);
  const gameStatus = winner
    ? `${winner} is the winner 🎉`
    : isBoardFull
    ? "Match Tie 🙁"
    : mySymbol
    ? `You are ${mySymbol}`
    : "";

  return (
    <div style={{ maxWidth: 450, margin: "2rem auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      {/* Game setup UI */}
      {!gameStarted && (
        <div
          style={{
            backgroundColor: "#fff3bf",
            padding: 20,
            borderRadius: 10,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            marginBottom: 20,
          }}
        >
          {optionSelected ? (
            optionNewGame ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                  <p
                    style={{
                      flex: 1,
                      margin: 0,
                      fontWeight: "bold",
                      wordBreak: "break-word",
                      backgroundColor: "white",
                      padding: "8px 12px",
                      borderRadius: 5,
                    }}
                  >
                    {currentGame || "Refresh the Page"}
                  </p>
                  <CopyToClipboard text={currentGame || ""} onCopy={() => setStatus("Game number copied!")}>
                    <button
                      style={{
                        marginLeft: 10,
                        backgroundColor: "#22C55E",
                        border: "none",
                        borderRadius: 5,
                        padding: "8px 12px",
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Copy Code
                    </button>
                  </CopyToClipboard>
                </div>
                <p style={{ color: "#dc2626", textAlign: "center" }}>{status}</p>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                  <input
                    placeholder="Enter the Code"
                    value={gameNumber}
                    onChange={(e) => setGameNumber(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: 5,
                      border: "1px solid #ccc",
                      marginRight: 10,
                    }}
                  />
                  <button
                    onClick={handleJoinGame}
                    style={{
                      backgroundColor: "#22C55E",
                      border: "none",
                      borderRadius: 5,
                      padding: "8px 12px",
                      cursor: "pointer",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Join Game
                  </button>
                </div>
                <p style={{ color: "#dc2626", textAlign: "center" }}>{status}</p>
              </div>
            )
          ) : (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={handleCreateGame}
                style={{
                  backgroundColor: "#22C55E",
                  border: "none",
                  borderRadius: 5,
                  padding: "10px 20px",
                  cursor: "pointer",
                  color: "black",
                  fontWeight: "bold",
                  flex: 1,
                  marginRight: 10,
                }}
              >
                Create Game
              </button>
              <button
                onClick={() => setOptionSelected(true)}
                style={{
                  backgroundColor: "#facc15",
                  border: "none",
                  borderRadius: 5,
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  flex: 1,
                }}
              >
                Join Game
              </button>
            </div>
          )}
          {!optionSelected && (
            <p style={{ textAlign: "center", marginTop: 15, color: "#dc2626" }}>
              Game On! Create New or Join Existing
            </p>
          )}
        </div>
      )}

      {/* Game Status */}
      {currentGame && (
        <div style={{ textAlign: "center", marginBottom: 20, color: "#16a34a" }}>
          <p style={{ margin: "0 0 8px" }}>{gameStatus}</p>
          {!winner && !isBoardFull && (
            <p style={{ margin: 0 }}>Current Turn: {isXNext ? "X" : "O"}</p>
          )}
        </div>
      )}

      {/* Status error or messages */}
      <p style={{ color: "#dc2626", textAlign: "center", marginBottom: 20 }}>{status}</p>

      {/* Board grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          maxWidth: 430,
          margin: "0 auto",
        }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              height: 100,
              fontSize: 36,
              cursor: "pointer",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              userSelect: "none",
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Reset and result message overlay */}
      {(winner || isBoardFull) && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.85)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <h2 style={{ color: winner === mySymbol ? "#16a34a" : "#dc2626", marginBottom: 20 }}>
            {winner
              ? winner === mySymbol
                ? "You win! 🎉"
                : "You lose the game 😞"
              : "It's a draw!"}
          </h2>
          <button
            onClick={() => reset(true)}
            style={{
              backgroundColor: "#fff3bf",
              border: "none",
              padding: "10px 30px",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiplayerTicTacToe;
