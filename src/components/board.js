import React from "react";
import Box from "./box";
import "./styles/board.css";

const Board = ({
  selected,
  setSelected,
  board,
  setBoard,
  action,
  setAction,
  play,
  logs,
  setLogs,
  gameId,
  setLoading,
  setWin,
  setCounter,
  counter,
}) => {
  const rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <div className="board">
      <div className="row">
        <div className="col-letter"></div>
        {columns.map((column) => (
          <div className="col-letter">{column}</div>
        ))}
      </div>
      {rows.map((row) => (
        <div className="row">
          <div className="row-number">{row}</div>
          {columns.map((column) => (
            <Box
              pos={column + row}
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
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
