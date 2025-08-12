import React, { useState, lazy, Suspense } from "react";

// Lazy-load game components
const SudokuGame = lazy(() => import("../SudukoGame.jsx"));
const SinglePlayerTicTacToeGame = lazy(() =>
  import("../SinglePlayer-TicTacToeGame.jsx")
);
const MultiplayerTicTacToeGame = lazy(() =>
  import("../Multiplayer-TicTacToeGame.jsx")
);

const SelectGame = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      name: "Tic Tac Toe (Single Player)",
      component: "SinglePlayerTicTacToeGame",
      backgroundColor: "#FF3737",
      textColor: "white",
    },
    {
      name: "Tic Tac Toe (Multiplayer)",
      component: "MultiplayerTicTacToeGame",
      backgroundColor: "#22C55E",
      textColor: "white",
    },
    {
      name: "Sudoku",
      component: "SudokuGame",
      backgroundColor: "#3B82F6",
      textColor: "black",
    },
  ];

  const Card = ({ name, backgroundColor, textColor = "black", onClick }) => (
    <div
      onClick={onClick}
      className="game-card"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <span>{name}</span>
    </div>
  );

  const renderSelectedGame = () => {
    switch (selectedGame) {
      case "SudokuGame":
        return <SudokuGame />;
      case "SinglePlayerTicTacToeGame":
        return <SinglePlayerTicTacToeGame />;
      case "MultiplayerTicTacToeGame":
        return <MultiplayerTicTacToeGame />;
      default:
        return null;
    }
  };

  return (
    <>
      <div id="bgGrid"></div>
      <div id="blurGrid"></div>

      <style>{`
        #bgGrid {
          position: fixed;
          will-change: transform;
          background-size: 2.5rem 2.5rem;
          background-image: linear-gradient(90deg, rgba(0,0,0,0.133) 1px, transparent 0),
                            linear-gradient(180deg, rgba(5,5,5,0.133) 1px, transparent 0);
          z-index: -2;
          inset: 0;
          height: 100vh;
        }

        #blurGrid {
          background: radial-gradient(circle, hsla(0,8%,95%,0.6) 0, hsla(0,11%,96%,0.97) 90%, white 100%);
          z-index: -1;
          inset: 0;
          height: 100vh;
          position: fixed;
        }

        .cardContainer {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          padding: 2rem 1rem;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .game-card {
          border-radius: 10px;
          padding: 1rem;
          width: 180px;
          height: 100px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s;
          font-size: 0.9rem;
          line-height: 1.2;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          color: #333;
          text-wrap: balance;
          word-break: break-word;
        }

        .game-card:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .game-card {
            width: 140px;
            height: 90px;
            font-size: 0.85rem;
            padding: 0.8rem;
          }
        }

        @media (max-width: 500px) {
          .game-card {
            width: 130px;
            padding: 0.8rem;
            font-size: 0.8rem;
            min-height: 70px;
          }
        }

        .gameCanvas {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {!selectedGame ? (
        <>
          <div style={{ textAlign: "center", paddingTop: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Choose Your Game
            </h2>
          </div>

          <div className="cardContainer">
            {games.map((game, index) => (
              <Card
                key={index}
                {...game}
                onClick={() => setSelectedGame(game.component)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="gameCanvas">
          <Suspense fallback={<div>Loading Game...</div>}>
            {renderSelectedGame()}
          </Suspense>
        </div>
      )}
    </>
  );
};

export default SelectGame;
