import * as appSettingApi from "../api/AppSettingApi";
import * as authRepo from "./AuthRepo";

export const getAppSettings = async () => {
  const settings = await appSettingApi.appSettings();
  return settings;
};
