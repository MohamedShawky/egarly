import Echo from "laravel-echo";
import Socketio from "socket.io-client";
import { SOCKET_ENDPOINT } from "../utils/Config";
let echo = null;
export const initSocket = token => {
  echo = new Echo({
    broadcaster: "socket.io",
    host: SOCKET_ENDPOINT,
    client: Socketio,
    transports: ["websocket", "polling"],
    auth: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
};

export const getEcho = () => {
  return echo;
};

export const removeEcho = user_id => {
  echo.leave(`users.${user_id}`);
  echo = null;
};
