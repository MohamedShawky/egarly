import * as yup from "yup";
import I18n from "react-native-i18n";
import { asyncValidationSchema } from "../../utils/validation";

export const buildValidationSchemaEGY = formik => {
  const obj = {
    password: yup
      .string()
      .required(I18n.t("signup-field-required")),
      // .matches(
      //   /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*-.])[A-Za-z\d$@$!%_*_#?&-_.]{8,}$/,
      //   I18n.t("signUp-password-invalid")
      // ),
    confirmation_password: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .test(
        "passwords-match",
        I18n.t("signup-confirmPassword-invalid"),
        function(value) {
          return this.parent.password === value;
        }
      )
  };

  obj.name = yup.string().required(I18n.t("signup-field-required"));

  obj.email = yup
    .string()
    .required(I18n.t("signup-field-required"))
    .email(I18n.t("signup-email-invalid"));

  return yup.object().shape(obj);
};
