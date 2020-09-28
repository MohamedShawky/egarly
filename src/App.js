
import React,{  } from "react";
import { Navigation } from "react-native-navigation";
import registerScreens from "./screens";
import {
  AppNavigation as nv,
  registerCustomIconType,
  showError
} from "./common";
import icoMoonConfig from "./common/utils/selection.json";
import { onAppLaunch } from "./utils/AppLaunch";
import { requestConfig } from "./utils/interceptors";
import { View } from "react-native-animatable";

export const startApp = () => {
 
  requestConfig();
  registerCustomIconType("custom", icoMoonConfig);
  registerScreens();

  Navigation.events().registerAppLaunchedListener(() => {
    onAppLaunch();

  });
};
