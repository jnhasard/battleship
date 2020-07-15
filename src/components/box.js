import React, { useEffect } from "react";
import { postAction } from "./api/requests";
import "./styles/box.css";

const Box = ({
  pos,
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
  const letters = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
  };
  const fireRange = { F: 4, C: 3, D: 2, A: 1 };
  const moveRange = { F: 2, C: 2, D: 3, A: 5 };

  useEffect(() => {
    if (!play) {
      board[pos] = {
        ship: "",
        legal: false,
        style: "",
        playing: false,
        available: true,
      };
      setBoard({ ...board });
    }
  }, []);

  const handleClick = () => {
    if (board[pos].legal) {
      if (action === "move") {
        moveShip();
      } else {
        fire();
      }
      setAction("");
    } else if (board[pos].ship === "" && selected) {
      board[pos].ship = selected;
      setBoard({ ...board });
      setSelected("");
    } else if (board[pos].ship !== "" && action) {
      board[pos].playing = true;
      if (action === "move") {
        validateMove();
      } else {
        validateFire();
      }
    }
  };

  const fire = async () => {
    let log = {
      user: "[Usuario]",
      action: "Disparo",
      ship: "",
      towards: pos,
    };
    Object.keys(board).forEach((pos2) => {
      if (board[pos2].playing) {
        log.ship = board[pos2].ship;
        board[pos2].playing = false;
      }
      board[pos2].style = "";
      board[pos2].legal = false;
    });
    setLoading(true);
    const res = await postAction(gameId, log);
    handleResponse(res, log);
    setLoading(false);
  };

  const moveShip = async () => {
    let log = {
      user: "[Usuario]",
      action: "Mover",
      ship: "",
      towards: "",
      blocks: 0,
    };
    Object.keys(board).forEach((pos2) => {
      if (board[pos2].playing) {
        board[pos].ship = board[pos2].ship;
        board[pos2].playing = false;
        board[pos2].ship = "";
        log.ship = board[pos].ship;
        if (pos2[0] === pos[0]) {
          if (parseInt(pos2.slice(1)) < parseInt(pos.slice(1))) {
            log.towards = "Sur";
          } else {
            log.towards = "Norte";
          }
          log.blocks = Math.abs(
            parseInt(pos2.slice(1)) - parseInt(pos.slice(1))
          ).toString();
        } else {
          if (letters[pos2[0]] < letters[pos[0]]) {
            log.towards = "Este";
          } else {
            log.towards = "Oeste";
          }
          log.blocks = Math.abs(letters[pos2[0]] - letters[pos[0]]).toString();
        }
      }
      board[pos2].style = "";
      board[pos2].legal = false;
    });
    setBoard({ ...board });
    setLoading(true);
    const res = await postAction(gameId, log);
    handleResponse(res, log);
    setLoading(false);
  };

  const validateMove = () => {
    Object.keys(board).forEach((pos2) => {
      if (pos !== pos2) {
        if (
          pos2.slice(1) === pos.slice(1) &&
          Math.abs(letters[pos2[0]] - letters[pos[0]]) <=
            moveRange[board[pos].ship[0]] &&
          board[pos2].ship === "" &&
          board[pos2].available
        ) {
          board[pos2].legal = true;
          board[pos2].style = "legit";
        } else if (
          pos[0] === pos2[0] &&
          Math.abs(parseInt(pos2.slice(1)) - parseInt(pos.slice(1))) <=
            moveRange[board[pos].ship[0]] &&
          board[pos2].ship === "" &&
          board[pos2].available
        ) {
          board[pos2].legal = true;
          board[pos2].style = "legit";
        }
      }
    });
    setBoard({ ...board });
  };

  const validateFire = () => {
    Object.keys(board).forEach((pos2) => {
      if (
        pos2.slice(1) === pos.slice(1) &&
        Math.abs(letters[pos2[0]] - letters[pos[0]]) <=
          fireRange[board[pos].ship[0]]
      ) {
        board[pos2].legal = true;
        board[pos2].style = "attack";
      } else if (
        pos[0] === pos2[0] &&
        Math.abs(parseInt(pos2.slice(1)) - parseInt(pos.slice(1))) <=
          fireRange[board[pos].ship[0]]
      ) {
        board[pos2].legal = true;
        board[pos2].style = "attack";
      }
    });
    setBoard({ ...board });
  };

  const handleResponse = (response, userAction) => {
    const numbers = {
      "0": "A",
      "1": "B",
      "2": "C",
      "3": "D",
      "4": "E",
      "5": "F",
      "6": "G",
      "7": "H",
      "8": "I",
      "9": "J",
    };
    const directions = {
      SOUTH: "Sur",
      NORTH: "Norte",
      EAST: "Este",
      WEST: "Oeste",
    };
    const actions = {
      MOVE: "Mover",
      FIRE: "Disparo",
    };
    const events = {
      HIT_SHIP: "Impactaste al barco ",
      SHIP_DESTROYED: "Destruiste el barco ",
      ALL_SHIPS_DESTROYED: "Destruiste todos los barcos",
    };

    let computerAction = {
      user: "[Computador]",
      action: actions[response.action.type],
      ship: response.action.ship,
      towards: "",
    };

    let computerEvents = [];

    if (response.action.type === "MOVE") {
      computerAction.towards = directions[response.action.direction];
      computerAction.blocks = response.action.quantity;
    } else if (response.action.row) {
      computerAction.towards =
        numbers[response.action.row.toString()] +
        (response.action.column + 1).toString();
      if (board[computerAction.towards].ship !== "") {
        computerEvents = sinkShip(computerAction.towards);
      }
    }
    if (response.events.length > 0) {
      response.events.forEach((event) => {
        if (event.type === "DESTROYED_ALL_SHIPS") {
          setWin(true);
        }
        computerEvents.push({ type: events[event.type], ship: event.ship });
      });
    }
    setLogs([computerAction, ...computerEvents, userAction, ...logs]);
  };

  const sinkShip = (pos) => {
    let log = [
      { type: "Impactaron tu barco ", ship: board[pos].ship },
      { type: "Destruyeron tu barco ", ship: board[pos].ship },
    ];
    board[pos].ship = "";
    board[pos].available = false;
    board[pos].style = "dead";
    setCounter(counter - 1);
    if (counter === 0) {
      setWin(true);
    }
    setBoard({ ...board });
    return log;
  };

  return (
    <div
      className={
        board[pos] && !board[pos].available
          ? "box dead"
          : `box ${board[pos] && board[pos].playing && "active "} ${
              board[pos] && board[pos].style
            }`
      }
      onClick={handleClick}
    >
      <p>{board[pos] && board[pos].ship}</p>
    </div>
  );
};

export default Box;
