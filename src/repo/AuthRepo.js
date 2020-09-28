import * as authApi from "../api/AuthApi";
import * as asyncStorageProvider from "../cache/AsyncStorageProvider";
// import * as socialProvider from "../socialProvider";
import * as deepStreamAuthProvider from "../realTime/DeepStream/Auth";

export const saveUser = async (user) => {
  console.log("save user ...", user);

  const res = await asyncStorageProvider.saveCurrentUser(user);
  return res;
};

export const login = async (values = { emailOrPhone, password }) => {
  const user = await authApi.login(values);
  return user;
};

export const signUp = async (
  values = {
    name,
    email,
    password,
    confirmation_password,
  }
) => {
  const user = await authApi.signUp(values);
  return user;
};

export const getUserData = async () => {
  const userDetails = await authApi.getUserData();
  return userDetails;
};

export const verifyCode = async (code) => {
  const isVerified = await authApi.verifyCode(code);
  return isVerified;
};

export const verifyCodeToForgetPassword = async (emailOrPhone, code) => {
  const isVerified = await authApi.verifyCodeToForgetPassword(
    emailOrPhone,
    code
  );
  return isVerified;
};

export const resendVerifyCode = async (emailOrPhone) => {
  const resend = await authApi.resendVerifyCode(emailOrPhone);
  return resend;
};

export const resendVerifyCodeForgetPassword = async (emailOrPhone) => {
  const resend = await authApi.resendVerifyCodeToForgetPassword(emailOrPhone);
  return resend;
};

export const changePhone = async (phone) => {
  const isPhoneChanged = await authApi.changePhone(phone);
  return isPhoneChanged;
};

export const changePassword = async (
  data = {
    old_password,
    password,
    password_confirmation,
  }
) => {
  const isPasswordChanged = await authApi.changePassword(data);
  return isPasswordChanged;
};

export const newPasswordToForgetPassword = async (
  data = { code, password, password_confirmation }
) => {
  const isPasswordChanged = await authApi.newPasswordToForgetPassword(data);
  return isPasswordChanged;
};

export const checkPrincipalUser = async () => {
  const userDetails = await asyncStorageProvider.getCurrentUser();
  return userDetails;
};

export const getDeepStreamClient = () => {
  const client = deepStreamAuthProvider.getClient();
  return client;
};

export const logout = async () => {
  const isLogOut = await asyncStorageProvider.deleteCurrentUser();
  // socialProvider.logoutFacebook();
  // socialProvider.logoutGoogle();
  // deepStreamAuthProvider.close();
  return isLogOut;
};

export const upDateProfile = async (values) => {
  const user = await authApi.upDateProfile(values);
  return user;
};

export const forgetPassword = async (values) => {
  const response = await authApi.forgetPassword(values);
  return response;
};
