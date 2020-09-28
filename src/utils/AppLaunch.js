import { Navigation } from "react-native-navigation";
import firebase from "react-native-firebase";
import SplashScreen from "react-native-splash-screen";
import { Platform } from "react-native";
// import Geolocation from '@react-native-community/geolocation';
import store from "../store";
import { AppNavigation as nv, showInfo } from "../common";
import { initInternetConnection } from "../actions/network";
import { initLang } from "../actions/lang";
import {
  checkLocationPermission,
  initBackgroundGeolocation,
} from "../actions/location";
import { autoLogin, initRealTimeSubscriptions } from "../actions/AuthActions";
import colors from "../common/defaults/colors";
import { onSelectTab } from "../actions/BottomTabsActions";

import { SET_LOCATION } from "../actions/types";
import { initUnseenNotificationCount } from "../actions/NotificationActions";

const defaultNavOptions = {
  statusBar: {
    visible: true,
    style: Platform.Version > 23 ? "dark" : "light",
    backgroundColor: Platform.Version > 23 ? "#FFCC00" : colors.statusBar,
    // backgroundColor:colors.statusBar,
  },
  topBar: {
    drawBehind: true,
    visible: false,
    animate: false,
  },
  layout: {
    backgroundColor: "white",
    orientation: ["portrait"],
  },
  animations: {
    push: {
      waitForRender: false,
    },
    showModal: {
      waitForRender: false,
    },
  },
  bottomTabs: {
    visible: false,
    animate: false,
  },
};

export const onAppLaunch = async () => {
  // default navigation
  Navigation.setDefaultOptions(defaultNavOptions);
  // language

  onSelectTab(0)(store.dispatch);

  Navigation.mergeOptions("MAIN_STACK", {
    bottomTabs: {
      currentTabIndex: 0,
    },
  });
  await initLang("ar", true)(store.dispatch);
  initInternetConnection(store.dispatch);
  // location
  checkLocationPermission(true, () => {
    initBackgroundGeolocation(store.dispatch, store.getState);
  });
  // firebase
  await firebase.messaging().requestPermission();
  const fcmToken = await firebase.messaging().getToken();
  firebase.notifications().onNotification(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
    showInfo("تم وصول اشعار");
  });

  firebase.messaging().onMessage((v) => console.log("vvvvvv", v));

  // check if user logged in or not
  const currentUser = await autoLogin()(store.dispatch, store.getState);

  // hide splashScreen
  SplashScreen.hide();
  // authorized
  if (currentUser) {
    const current = store.getState().auth.currentUser;

    initUnseenNotificationCount(current.user.id)(
      store.dispatch,
      store.getState
    );

    nv.navigateToHome();

    // nv.init("MAIN_STACK", {
    //   name: "creditCard",
    //   passProps: {
    //     order_id: 139,
    //     owner_id: 28,
    //   },
    // });
  } else {
    // no auth
    nv.init("MAIN_STACK", {
      name: "walkthrough",
    });
  }
};
