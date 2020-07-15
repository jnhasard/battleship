import React, { useState } from "react";
import "./styles/selection.css";

const Selection = ({ selected, setSelected, board, setBoard, setPlay }) => {
  const [frigate, setFrigate] = useState(4);
  const [cruiser, setCruiser] = useState(3);
  const [destructor, setDestructor] = useState(2);
  const [aircraft, setAircraft] = useState(1);

  const reset = () => {
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
    setFrigate(4);
    setCruiser(3);
    setDestructor(2);
    setAircraft(1);
  };

  return (
    <div className="side-bar">
      <h2>Elija una nave y luego donde quiere colocarla</h2>
      <div className="ship-buttons">
        <button
          className="ship-button"
          onClick={() => {
            if (selected === "") {
              setSelected("F" + (5 - frigate).toString());
              setFrigate(frigate - 1);
            }
          }}
          disabled={frigate !== 0 ? false : true}
        >
          Fragata ({frigate})
        </button>
        <button
          className="ship-button"
          onClick={() => {
            if (selected === "") {
              setSelected("C" + (4 - cruiser).toString());
              setCruiser(cruiser - 1);
            }
          }}
          disabled={cruiser !== 0 ? false : true}
        >
          Crucero ({cruiser})
        </button>
        <button
          className="ship-button"
          onClick={() => {
            if (selected === "") {
              setSelected("D" + (3 - destructor).toString());
              setDestructor(destructor - 1);
            }
          }}
          disabled={destructor !== 0 ? false : true}
        >
          Destructor ({destructor})
        </button>
        <button
          className="ship-button"
          onClick={() => {
            if (selected === "") {
              setSelected("A" + (2 - aircraft).toString());
              setAircraft(aircraft - 1);
            }
          }}
          disabled={aircraft !== 0 ? false : true}
        >
          Portaviones ({aircraft})
        </button>
        <button className="ship-button" onClick={() => reset()}>
          Resetear
        </button>
        <button
          className="ship-button"
          disabled={aircraft + destructor + cruiser + frigate !== 0}
          onClick={() => {
            setPlay(true);
            setFrigate(4);
            setCruiser(3);
            setDestructor(2);
            setAircraft(1);
          }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Selection;
