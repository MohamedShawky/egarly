import { AppState } from "react-native";
import I18n from "react-native-i18n";

import Sound from "react-native-sound";
import {
  UNSEEN_NOTIFICATION_COUNT_SET,
  UNSEEN_NOTIFICATION_COUNT_RESET,
} from "./types";

import store from "../store";

import { showError } from "../common";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";

Sound.setCategory("Playback");

const notificationSound = new Sound(
  "notification_bell.mp3",
  Sound.MAIN_BUNDLE,
  (error) => {
    if (error) {
      return;
    }
    notificationSound.setVolume(1);
  }
);

notificationSound.setVolume(1);
let firstTimePassed = false;

const handleAppStateChanged = (evt) => {
  if (evt === "active") {
    notificationSound.setVolume(1);
  } else if (evt === "background") {
    notificationSound.setVolume(0);
  }
};

export const initUnseenNotificationCount = (userId) => async (dispatch) => {
  if (!userId) return;
  AppState.addEventListener("change", handleAppStateChanged);
  const current = store.getState().auth.currentUser;
  let options = {
    broadcaster: "pusher",
    key: "myKey",
    wsHost: "ejarly.dev.fudexsb.com",
    wsPort: 6001,
    wssPort: 6001,
    disableStats: true,
    authEndpoint: "http://ejarly.dev.fudexsb.com/broadcasting/auth",

    auth: {
      headers: {
        Authorization: `Bearer ${current.token}`,
      },
    },
  };
  let PusherClient = new Pusher(options.key, options);

  let echo = new Echo({
    broadcaster: "pusher",
    client: PusherClient,
    ...options,
  });


  echo
    .join(`chat.unread_messages.${current.user.id}`)
    .listen("UnReadMessages", (event) => {
      store.dispatch({
        type: UNSEEN_NOTIFICATION_COUNT_SET,
        payload: event.count_msg,
      });
    });
};







export const resetUnseenNotification = (userId) => async (dispatch) => {
  try {
    const isReset = await resetUnseenNotificationCount(userId);
    if (isReset) {
      dispatch({
        type: UNSEEN_NOTIFICATION_COUNT_RESET,
      });
    }
  } catch (error) {
    if (typeof error === "object") {
      showError(error.message);
    }
  }
};
