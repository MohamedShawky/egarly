import * as yup from "yup";
import I18n from "react-native-i18n";

export default () => {
  const obj = {};

  obj.email = yup
    .string()
    .required(I18n.t("signup-field-required"))
    .email(I18n.t("signup-email-invalid"));

  obj.phone = yup
    .string()
    .required(I18n.t("signup-field-required"))
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8}$/,
      I18n.t("signup-invalid-phone-error")
    );

  obj.userName = yup.string().required(I18n.t("signup-field-required"));

  return yup.object().shape(obj);
};
