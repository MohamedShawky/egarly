import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchemaPasswords = () =>
  yup.object().shape({
    password: yup
      .string()
      .required(` ${I18n.t("input-required-error")}`)
      .min(6, I18n.t("signUp-password-invalid")),
    confirmPassword: yup
      .string()
      .required(`${I18n.t("input-required-error")}`)
      .test(
        "passwords-match",
        I18n.t("signup-confirmPassword-invalid"),
        function(value) {
          return this.parent.password === value;
        }
      ),
  });

export const validationSchemaEmail = () =>
  yup.object().shape({
    emailOrPhone: yup
      .string()
      .matches(
        /(^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$|^^(\+2)?01([0-2]|5){1}[0-9]{8}$|^(\+966|0)+5(5|0|3|6|4|9|1|8|7)([0-9]{7})$)/,
        I18n.t("invalid-phone-or-email")
      )
      .required(I18n.t("signup-field-required")),
  });
export const validationSchema = () =>
  yup.object().shape({
    verifyCode4: yup
      .string()
      .required("required")
      .matches(/[\d]{1}/, I18n.t("codeError")),
    verifyCode3: yup
      .string()
      .required("required")
      .matches(/[\d]{1}/, I18n.t("codeError")),
    verifyCode2: yup
      .string()
      .required("required")
      .matches(/[\d]{1}/, I18n.t("codeError")),
    verifyCode1: yup
      .string()
      .required("required")
      .matches(/[\d]{1}/, I18n.t("codeError")),
  });
