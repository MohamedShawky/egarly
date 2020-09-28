import axios from "axios";
import { AsyncStorage } from "react-native";
import I18n from "react-native-i18n";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./types";
import { API_ENDPOINT_GATEWAY } from "../utils/Config";
import { AppNavigation, showError, showSuccess } from "../common";
import * as authRepo from "../repo/AuthRepo";
import * as errors from "../utils/Errors";

export function updateProfile(values, setSubmitting) {
  return async (dispatch, getState) => {
    console.log("values ==>>", values);

    const data = new FormData();

    if (values.userName) {
      data.append("username", values.userName);
    }
    data.append("first_name", values.firstName);
    if (values.lastName) {
      data.append("last_name", values.lastName);
    }
    data.append("email", values.email);
    if (values.phone) {
      data.append("phone", values.phone);
    }

    if (values.latitude) {
      data.append("latitude", values.latitude);
    }

    if (values.longitude) {
      data.append("longitude", values.longitude);
    }

    if (values.avatar && !values.avatar.startsWith("http")) {
      data.append("avatar", {
        uri: values.avatar,
        type: "image/*",
        name: "avatar",
      });
    }

    console.log("data ==>", data);

    try {
      const user = await authRepo.upDateProfile(data);
      const token = getState().auth.currentUser.token;

      const currentUser = {
        token: token,
        user: user.user,
      };
      console.log("currentUser", currentUser);

      await authRepo.saveUser(currentUser);
      dispatch({ type: LOGIN_SUCCESS, payload: currentUser });

      showSuccess("تم تحديث البيانات بنجاح");
      AppNavigation.pop();
    } catch (error) {
      console.log("data error ==>", error);

      if (error === errors.CONNECTION_ERROR) {
        dispatch({
          type: LOGIN_FAIL,
          payload: I18n.t("ui-networkConnectionError"),
        });
      } else if (typeof error === "object") {
        dispatch({
          type: LOGIN_FAIL,
          payload: I18n.t("ui-form-error"),
        });
      }
    } finally {
      setSubmitting(false);
    }
  };
}
