import * as yup from "yup";
import I18n from "react-native-i18n";

export const buildValidationSchema = (formik) => {
  const obj = {
    oldPassword: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .matches(/^(?=.*\d).{6,}$/, I18n.t("signUp-password-invalid")),
    newPassword: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .matches(/^(?=.*\d).{6,}$/, I18n.t("signUp-password-invalid")),

    confirmPassword: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .test(
        "passwords-match",
        I18n.t("signup-confirmPassword-invalid"),
        function(value) {
          return this.parent.newPassword === value;
        }
      ),
  };

  return yup.object().shape(obj);
};
