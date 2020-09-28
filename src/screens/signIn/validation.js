import React from "react";
import * as yup from "yup";
import I18n from "react-native-i18n";

export default () =>
  yup.object().shape({
    emailOrPhone: yup.string().required(`${I18n.t("input-required-error")}`).email(),
    password: yup
      .string()
      .required(` ${I18n.t("input-required-error")}`)
      .min(6, I18n.t("signUp-password-invalid"))
     
  });
