import axios from "axios";
import store from "../store";

export const requestConfig = () => {
  axios.interceptors.request.use(
    (config) => {
      const { currentUser } = store.getState().auth;

      const { lang } = store.getState().lang;
      const { Authorization } = config.headers;
      const authorization = currentUser
        ? {
            Authorization: `Bearer ${currentUser.token}`,
          }
        : Authorization
        ? { Authorization }
        : Authorization;
      return {
        ...config,
        headers: {
          // "Accept-Language": lang,
          // ...config.headers,
          Accept: "application/json",
          ...authorization,
        },
      };
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
