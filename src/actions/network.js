import NetInfo from "@react-native-community/netinfo";

import { SET_INTERNET_CONNECTION } from "./types";
import {Platform}  from 'react-native';

export async function initInternetConnection(dispatch) {

  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Is connected?", state.isConnected);
    console.log("Is reachable?", state.isInternetReachable);
    dispatch({ type: SET_INTERNET_CONNECTION, payload: Platform.OS === "ios" ?  state.isConnected : state.isInternetReachable })
  });

  const isConnected = await NetInfo.fetch().then(state =>
    dispatch({ type: SET_INTERNET_CONNECTION, payload: Platform.OS === "ios" ?  state.isConnected : state.isInternetReachable })
  );

}