import React from "react";
import Logs from "./logs";
import "./styles/selection.css";

const Play = ({
  action,
  setAction,
  board,
  setBoard,
  setPlay,
  logs,
  setLogs,
  loading,
  win,
  counter,
  setId,
  setCounter,
}) => {
  const surrender = () => {
    Object.keys(board).forEach((pos) => {
      board[pos] = {
        ship: "",
        legal: false,
        style: "",
        playing: false,
        available: true,
      };
    });
    setBoard({ ...board });
    setPlay(false);
    setCounter(10);
    setId();
  };

  const handleCancel = () => {
    Object.keys(board).forEach((pos) => {
      board[pos].style = "";
      board[pos].legal = false;
      board[pos].playing = false;
    });
    setBoard({ ...board });
  };
  return (
    <div className="side-bar">
      {!win ? (
        <div>
          <h2>Seleccione una acción</h2>
          {!loading ? (
            <div className="ship-buttons">
              <button
                className="play-button"
                onClick={() => setAction("move")}
                disabled={action === "fire"}
              >
                Mover
              </button>
              <button
                className="play-button"
                onClick={() => setAction("fire")}
                disabled={action === "move"}
              >
                Disparar
              </button>
              <button
                className="ship-button"
                disabled={action === ""}
                onClick={() => {
                  handleCancel();
                  setAction("");
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="loading">loading...</div>
          )}
        </div>
      ) : (
        <div>
          {counter === 0 ? (
            <div>
              <h2>QUE LÁSTIMA</h2>
              <h2>ERES EL</h2>
              <h1>PERDEDOR</h1>
            </div>
          ) : (
            <div>
              <h2>FELICITACIONES</h2>
              <h2>ERES EL</h2>
              <h1>GANADOR</h1>
            </div>
          )}
        </div>
      )}

      <Logs logs={logs} setLogs={setLogs} />
      <div className="ship-buttons">
        <button className="ship-button" onClick={surrender}>
          {win ? "Juego Nuevo" : "Rendirse"}
        </button>
      </div>
    </div>
  );
};

export default Play;
