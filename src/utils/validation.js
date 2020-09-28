import axios from "axios";
import * as yup from "yup";
import I18n from "react-native-i18n";
import { API_ENDPOINT_GATEWAY, API_ENDPOINT_HOME_SERVICE } from "./Config";

export const asyncValidationSchema = (
  key,
  errorMessage,
  syncValidationSchema,
  formik,
  country
) => {
  let prevValue;
  return yup.string().test(key, errorMessage, async function(value) {
    //syncValidation
    try {
      await syncValidationSchema.validateSync(value);
    } catch (error) {
      prevValue = value;
      return this.createError({
        message: error.message,
        path: key
      });
    }
    //asyncValidation
    const state = formik.current.state;
    if (prevValue == value) {
      if (state.errors[key]) {
        return this.createError({
          message: state.errors[key],
          path: key
        });
      } else {
        return true;
      }
    }

    try {
      delete state.errors[key];
      formik.current.setState({
        ...state,
        status: { [key]: true }
      });
      const res = await axios.put(`${API_ENDPOINT_GATEWAY}auth/check-${key}`, {
        [key]: value,
        country: country || this.parent.country
      });      
      return !res.data.found;
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.log("errrrrrrrorrrrrrr",JSON.parse(JSON.stringify(error)));
        
        return this.createError({
          message: I18n.t("ui-networkConnectionError"),
          path: key
        });
      }
    } finally {
      prevValue = value;
      formik.current.setStatus({
        [key]: false
      });
    }
  });
};

// ////////////////////

export const asyncValidationSchemaAddressBook = (
  key,
  errorMessage,
  syncValidationSchema,
  formik,
  address = null
) => {
  let prevValue;
  return yup.string().test(key, errorMessage, async function(value) {
    // syncValidation
    try {
      await syncValidationSchema.validateSync(value);
    } catch (error) {
      prevValue = value;
      return this.createError({
        message: error.message,
        path: key
      });
    }
    // asyncValidation
    const state = formik.current.state;
    if (prevValue == value) {
      if (state.errors[key]) {
        return this.createError({
          message: state.errors[key],
          path: key
        });
      }
      return true;
    }

    try {
      delete state.errors[key];
      formik.current.setState({
        ...state,
        status: { [key]: true }
      });
      if (address !== value) {
        const res = await axios.post(
          `${API_ENDPOINT_HOME_SERVICE}addresses/alias/checkExist`,
          {
            alias: value
          }
        );
        // console.log("async address ", res);
        return !res.data.foundALias;
      }
      return true;
    } catch (error) {
      console.log(error);
      if (!axios.isCancel(error)) {
        return this.createError({
          message: I18n.t("ui-networkConnectionError"),
          path: key
        });
      }
    } finally {
      prevValue = value;
      formik.current.setStatus({
        [key]: false
      });
    }
  });
};
