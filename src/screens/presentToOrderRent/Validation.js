import React from "react";
import * as yup from "yup";
import I18n from "react-native-i18n";

export default () =>
  yup.object().shape({
    emailOrPhone: yup.string().required(`${I18n.t("input-required-error")}`),
    password: yup
      .string()
      .required(` ${I18n.t("input-required-error")}`)
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*-.])[A-Za-z\d$@$!%_*_#?&-_.]{8,}$/,
        I18n.t("signUp-password-invalid")
      )
  });
