import axios from "axios";
import { API_ENDPOINT_GATEWAY } from "../utils/Config";
import * as errors from "../utils/Errors";
import firebase from "react-native-firebase";

// sign In
export const login = async ({ emailOrPhone, password }) => {
  console.log("log in ----->>");

  const fcmToken = await firebase.messaging().getToken();

  try {
    const res = await axios.post(`${API_ENDPOINT_GATEWAY}login`, {
      email: emailOrPhone,
      password,
      android_token: fcmToken,
    });
    console.log("::::::::::::===>>", res);

    return res.data;
  } catch (error) {
    console.log("error , ", error.response);

    console.log("====================================");
    console.log(JSON.stringify(error));
    console.log("====================================");
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else if (error.response.status === 401) {
      throw errors.INVALID_USER;
    } else {
      throw errors.GENERAL_ERROR;
    }
  }
};

export const getUserData = async () => {
  try {
    const res = await axios.get(`${API_ENDPOINT_GATEWAY}user`);

    return res.data.user;
  } catch (error) {
    console.log("error , ", error.response);

    console.log("====================================");
    console.log(JSON.stringify(error));
    console.log("====================================");
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else if (error.response.status === 401) {
      throw errors.INVALID_USER;
    } else {
      throw errors.GENERAL_ERROR;
    }
  }
};
// sign up
export const signUp = async (
  values = {
    name,
    email,
    password,
    confirmation_password,
  }
) => {
  const fcmToken = await firebase.messaging().getToken();

  try {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmation_password: values.password,
      android_token: fcmToken,
    };
    const res = await axios.post(`${API_ENDPOINT_GATEWAY}register`, data);
    console.log("****", res);

    return res.data;
  } catch (error) {
    console.log("error , ", error);

    console.log("error , ", error.response);

    console.log("====================================");
    console.log(JSON.stringify(error));
    console.log("====================================");
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else if (error.response.data.errors.hasOwnProperty("email")) {
      throw {
        message: "الايميل مكرر من قبل",
      };
    } else {
      throw errors.GENERAL_ERROR;
    }
  }
};

export const verifyCode = async (code) => {
  console.log("verifiedCode", code);

  try {
    const res = await axios.post(`${API_ENDPOINT_GATEWAY}code_verfication`, {
      code: code,
    });
    console.log("res", res);

    return res.data.status;
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else if (error.response.status === 400) {
      throw errors.INVALID_CODE;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message,
      };
    }
  }
};

export const verifyCodeToForgetPassword = async (emailOrPhone, code) => {
  try {
    await axios.post(`${API_ENDPOINT_GATEWAY}forget-password/verify-code`, {
      email: emailOrPhone,
      verifyCode: code,
    });
    return true;
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else if (error.response.status === 400) {
      throw errors.INVALID_CODE;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message,
      };
    }
  }
};

export const resendVerifyCode = async (emailOrPhone) => {
  try {
    await axios.post(`${API_ENDPOINT_GATEWAY}auth/signup/verify-code/resend`, {
      email: emailOrPhone,
    });
    return true;
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message,
      };
    }
  }
};

export const resendVerifyCodeToForgetPassword = async (emailOrPhone) => {
  try {
    await axios.post(`${API_ENDPOINT_GATEWAY}forgot/password`, {
      email: emailOrPhone,
    });
    return true;
  } catch (error) {
    console.log("error -->", error.response);

    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else if (error.response.status === 400) {
      throw errors.INVALID_PHONE_OR_EMAIL;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message,
      };
    }
  }
};

export const changePhone = async (phone) => {
  try {
    await axios.put(`${API_ENDPOINT_GATEWAY}auth/signup/new-phone`, {
      phone,
    });
    return true;
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message,
      };
    }
  }
};

export const upDateProfile = async (values) => {
  console.log("upDateProfile ====>", values);

  try {
    const response = await axios.post(
      `${API_ENDPOINT_GATEWAY}profile/update`,
      values
    );
    console.log("response update --->>", response);
    return response.data;
  } catch (error) {
    console.log("error", JSON.parse(JSON.stringify(error)));
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message,
      };
    }
  }
};

export const changePassword = async (
  data = {
    old_password,
    password,
    password_confirmation,
  }
) => {
  try {
    const isChanged = await axios.post(
      `${API_ENDPOINT_GATEWAY}change_password`,
      data
    );
    console.log("isChanged", isChanged);

    return isChanged.data.status;
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else if (error.response.status === 400) {
      throw errors.INVALID_PASSWORD;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message,
      };
    }
  }
};

export const newPasswordToForgetPassword = async (
  data = { code, password, password_confirmation }
) => {
  try {
    const res = await axios.post(
      `${API_ENDPOINT_GATEWAY}forget/password/action`,
      data
    );
    console.log("res", res);

    return true;
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message,
      };
    }
  }
};

export const forgetPassword = async (values) => {
  console.log("values ==>", values);

  try {
    const response = await axios.post(
      `${API_ENDPOINT_GATEWAY}forget/password`,
      values
    );
    return response.data.status;
  } catch (error) {
    console.log("error ==>>", error.response);

    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error.response.data)).message,
      };
    }
  }
};
