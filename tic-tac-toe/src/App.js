import { useState, useEffect } from "react";
import "./App.css";
import { tictactoe } from "./tictactoe";

function App() {
  const [board, setBoard] = useState(tictactoe.initialState());
  const [player, setPlayer] = useState(null);

  const [ia_turn, setIaTurn] = useState(false);
  const [player_turn, setPlayerTurn] = useState(false);

  const getPlayerChoice = playerChoice => {
    if (playerChoice === "X") {
      setPlayer(tictactoe.X);
      setPlayerTurn(true);
      setIaTurn(false);
    } else {
      setPlayer(tictactoe.O);
      setPlayerTurn(false);
      setIaTurn(true);
    }
  };

  const getAction = (indexR, indexC) => {
    if (player_turn) {
      // console.log(board);
      const newBoard = tictactoe.result(board, [indexR, indexC]);
      setBoard(newBoard);
      setPlayerTurn(false);
      setIaTurn(true);
    }
  };

  useEffect(() => {
    // console.log(board);
    if (!player_turn && ia_turn) {
      // console.log("ai turn");
      setTimeout(() => {
        setPlayerTurn(true);
        const move = tictactoe.minimax(board);
      
        const newBoard = tictactoe.result(board, move);
        setBoard(newBoard);
        // console.log(move);
        // console.log(board);
      }, 5000);
    }
  }, [player_turn, ia_turn, board]);

  return (
    <>
      <header>
        <h1 align="center">Tic Tac Toe</h1>
      </header>

      {player === null ? (
        <div>
          <button onClick={() => getPlayerChoice("X")}>Play as X</button>
          <button onClick={() => getPlayerChoice("O")}>Play as O</button>
        </div>
      ) : (
        <div className="content">
          <h3>You play as {player}</h3>
          {player_turn ? <p>your turn</p> : <p>computer turn</p>}
          <div className="board">
            {board.map((row, indexR) =>
              row.map((cell, indexC) => (
                <div onClick={() => getAction(indexR, indexC)} className="cell">
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
