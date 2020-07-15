import React, { useState, useEffect } from "react";
import Board from "./board";
import Selection from "./selection";
import Play from "./play";
import { getGameId, getToken } from "./api/requests";
import "./styles/game.css";

const Game = () => {
  const [selected, setSelected] = useState("");
  const [board, setBoard] = useState({});
  const [play, setPlay] = useState(false);
  const [action, setAction] = useState("");
  const [logs, setLogs] = useState([]);
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [win, setWin] = useState(false);
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    getToken().then(() => setId());
  }, []);

  const setId = async () => {
    const res = await getGameId();
    setGameId(res);
  };

  return (
    <div className="frame">
      <h1 className="title">IIC2513 - BattleShip</h1>
      <div className="columns">
        <div className="column is-two-thirds">
          <Board
            selected={selected}
            setSelected={setSelected}
            board={board}
            setBoard={setBoard}
            action={action}
            setAction={setAction}
            play={play}
            logs={logs}
            setLogs={setLogs}
            gameId={gameId}
            setLoading={setLoading}
            setWin={setWin}
            setCounter={setCounter}
            counter={counter}
          />
        </div>

        <div className="column">
          {play ? (
            <Play
              action={action}
              setAction={setAction}
              board={board}
              setBoard={setBoard}
              setPlay={setPlay}
              logs={logs}
              setLogs={setLogs}
              loading={loading}
              win={win}
              counter={counter}
              setId={setId}
              setCounter={setCounter}
            />
          ) : (
            <Selection
              selected={selected}
              setSelected={setSelected}
              board={board}
              setBoard={setBoard}
              setPlay={setPlay}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
