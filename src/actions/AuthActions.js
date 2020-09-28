import I18n from "react-native-i18n";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESET_ERROR,
  LOGOUT,
  SET_LOADING_OVERLAY_STATUS,
  CHANGE_MENU_STATUS,
  SAVE_USER,
} from "./types";
import * as clientRepo from "../repo/ClientRepo";
import * as authRepo from "../repo/AuthRepo";
import { AppNavigation } from "../common";
import * as errors from "../utils/Errors";

import * as deepStreamAuthProvider from "../realTime/DeepStream/Auth";

export const setCurrentUser = (data) => async (dispatch, getState) => {
  console.log("set current user ==>>", data);

  dispatch({
    type: SAVE_USER,
    payload: data,
  });
};

export const resetLoginError = () => async (dispatch, getState) => {
  dispatch({
    type: LOGIN_RESET_ERROR,
  });
};

export const signIn = (values, setSubmitting) => async (dispatch) => {
  try {
    const user = await authRepo.login(values);
    // success
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    await authRepo.saveUser(user);
    setCurrentUser(user);
    AppNavigation.navigateToHome();
    // if (!user.user.verified) {
    //   AppNavigation.setStackRoot({ name: "otpScreen" });
    // } else {
    //   const isClient = await clientRepo.isClient({ userId: user.user.id });
    //   if (isClient) {
    //     await authRepo.saveUser(user);
    //     // notificationsRepo.initSubscribtion(user);
    //     AppNavigation.navigateToHome();
    //   } else {
    //     AppNavigation.setStackRoot({
    //       name: "completeData",
    //       passProps: {
    //         userData: user
    //       }
    //     });
    //   }
    // }
  } catch (error) {
    // alert(error.response)
    if (error === errors.CONNECTION_ERROR) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError"),
      });
    } else if (error === errors.INVALID_USER) {
      dispatch({ type: LOGIN_FAIL, payload: I18n.t("invalid-user") });
    }
  } finally {
    setSubmitting(false);
  }
};

export const signUp = (values, setSubmitting) => async (dispatch) => {
  const data = new FormData();

  try {
    const user = await authRepo.signUp(values);
    // success
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    await authRepo.saveUser(user);
    AppNavigation.navigateToHome();
  } catch (error) {
    if (error === errors.CONNECTION_ERROR) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError"),
      });
    } else if (typeof error === "object") {
      console.log("errro ==>>>", error);

      dispatch({
        type: LOGIN_FAIL,
        payload: error.message,
      });
    } else if (error === errors.GENERAL_ERROR) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-form-error"),
      });
    }
  } finally {
    setSubmitting(false);
  }
};

export const onSignInFacebook = () => async (dispatch, getState) => {
  dispatch({
    type: SET_LOADING_OVERLAY_STATUS,
    name: "socialSignin",
    status: true,
  });

  try {
    const user = await authRepo.signInWithFacebook();
    // success
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    if (!user.user.verified) {
      AppNavigation.setStackRoot({ name: "otpScreen" });
    } else {
      const isClient = await clientRepo.isClient({ userId: user.user.id });
      if (isClient) {
        await authRepo.saveUser(user);
        // notificationsRepo.initSubscribtion(user);
        AppNavigation.navigateToHome();
      } else {
        AppNavigation.setStackRoot({
          name: "completeData",
          passProps: {
            userData: user,
          },
        });
      }
    }
  } catch (error) {
    if (error === errors.FACEBOOK_SDK) {
      onSignInFacebook()(dispatch, getState);
    } else if (error === errors.CONNECTION_ERROR) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError"),
      });
    } else if (typeof error === "object") {
      // error data register not completed from user
      AppNavigation.push({
        name: "signUpSocial",
        passProps: {
          data: error,
          accessToken: error.accessToken,
        },
      });
    }
  } finally {
    dispatch({
      type: SET_LOADING_OVERLAY_STATUS,
      name: "socialSignin",
      status: false,
    });
  }
};

export const onSignInGoogle = () => async (dispatch, getState) => {
  dispatch({
    type: SET_LOADING_OVERLAY_STATUS,
    name: "socialSignin",
    status: true,
  });

  try {
    const user = await authRepo.signInWithGoogle();
    // success
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    if (!user.user.verified) {
      AppNavigation.setStackRoot({ name: "otpScreen" });
    } else {
      const isClient = await clientRepo.isClient({ userId: user.user.id });
      if (isClient) {
        await authRepo.saveUser(user);
        // notificationsRepo.initSubscribtion(user);
        AppNavigation.navigateToHome();
      } else {
        AppNavigation.setStackRoot({
          name: "completeData",
          passProps: {
            userData: user,
          },
        });
      }
    }
  } catch (error) {
    if (error === errors.CONNECTION_ERROR) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError"),
      });
    } else if (typeof error === "object") {
      // error data register not completed from user
      AppNavigation.push({
        name: "signUpSocial",
        passProps: {
          data: error,
          accessToken: error.accessToken,
        },
      });
    } else if (error === errors.GOOGLE_PLAY_SERVICES_NOT_AVAILABLE) {
      dispatch({
        type: LOGIN_FAIL,
        payload: "google play services not available",
      });
    }
  } finally {
    dispatch({
      type: SET_LOADING_OVERLAY_STATUS,
      name: "socialSignin",
      status: false,
    });
  }
};

export const onSignUpSocial = (values, setSubmitting, accessToken) => async (
  dispatch,
  getState
) => {
  const v = {};
  if (values.nameAr) v.nameAr = values.nameAr;
  if (values.nameEn) v.nameEn = values.nameEn;
  if (values.email) v.email = values.email;
  if (values.city) v.city = values.city;
  v.country = 1;
  if (values.phone && values.country === 1 && values.phone.startsWith("0")) {
    v.phone = values.phone.slice(1);
  } else {
    v.phone = values.phone;
  }
  if (values.password) v.password = values.password;
  if (values.location) {
    v.location = [
      `${values.location.longitude}`,
      `${values.location.latitude}`,
    ];
  }

  try {
    const user = await authRepo.socialSignUp(v, accessToken);
    // success
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    AppNavigation.setStackRoot({ name: "otpScreen" });
  } catch (error) {
    if (error === errors.CONNECTION_ERROR) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError"),
      });
    } else if (error === errors.GENERAL_ERROR) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-form-error"),
      });
    }
  } finally {
    setSubmitting(false);
  }
};

export const initRealTimeSubscriptions = async (currentUser, dispatch) => {
  await deepStreamAuthProvider.authLogin(
    currentUser.accessToken,
    "CLIENT",
    currentUser.user.id
  );

  // subscribeToWallet(currentUser.user.id)(dispatch);
  // subscribeToChatCountAction(currentUser.user.id)(dispatch);
  // initUnseenNotificationCount(currentUser.user.id)(dispatch);
  // notificationsRepo.initSubscribtion(currentUser);
};
export const autoLogin = () => async (dispatch, getState) => {
  const currentUser = await authRepo.checkPrincipalUser();
  console.log("CurrentUser", currentUser);

  if (currentUser) {
    console.log("current user is defined");

    setCurrentUser(currentUser)(dispatch, getState);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: currentUser,
    });
    return currentUser;
  }
  return null;
};

export const logout = (id) => async (dispatch, getState) => {
  // await unsubscribeToNotification();

  
  await authRepo.logout();
  // unsubscibe notification local and firbase
  // navigate to auth
  
  setTimeout(() => dispatch({ type: LOGOUT }), 1500);
};
