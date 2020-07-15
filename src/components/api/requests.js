import { axiosInstance } from "./AxiosInstance";

export const getToken = async () => {
  const formData = { email: "jnhasard@uc.cl", studentNumber: "1562157J" };
  const path = "/auth";
  const res = await axiosInstance.put(path, formData);
  console.log("token: ", res.data.token);
  setToken(res.data.token);
};

const setToken = (token) => {
  if (token) {
    console.log("Header Set succesfully");
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
    localStorage.setItem("Authorization", JSON.stringify(token));
  }
};

export const getGameId = async () => {
  const res = await axiosInstance.post("/games");
  console.log("gameId: ", res.data.gameId);
  return res.data.gameId;
};

export const postAction = async (gameId, log) => {
  const directions = {
    Sur: "SOUTH",
    Norte: "NORTH",
    Este: "EAST",
    Oeste: "WEST",
  };
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

  let formData = {};
  if (log.action.type === "Mover") {
    formData = {
      action: {
        type: "MOVE",
        ship: log.ship,
        direction: directions[log.towards],
        quantity: log.blocks,
      },
    };
  } else {
    formData = {
      action: {
        type: "FIRE",
        ship: log.ship,
        row: parseInt(log.towards.slice(1)) - 1,
        column: letters[log.towards[0]] - 1,
      },
    };
  }
  const res = await axiosInstance.post(
    "/games/" + gameId + "/action",
    formData
  );
  return res.data;
};
