import * as yup from "yup";
import I18n from "react-native-i18n";
import axios from "axios";
import { asyncValidationSchema } from "../../utils/validation";

export const validationSchemaEGY = (country, formik) => {
  const syncPhoneSchema = yup
    .string()
    .required(I18n.t("signup-field-required"))
    .matches(
      /^^0?1([0-2]|5){1}[0-9]{8}$/,
      I18n.t("signup-invalid-phone-error")
    );

  return yup.object().shape({
    phone: asyncValidationSchema(
      "phone",
      I18n.t("signup-phone-exists-error"),
      syncPhoneSchema,
      formik,
      country
    )
  });
};

export const validationSchemaSAUDIA = (country, formik) => {
  const syncPhoneSchema = yup
    .string()
    .required(I18n.t("signup-field-required"))
    .matches(
      /^0?5(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
      I18n.t("signup-invalid-phone-error")
    );

  return yup.object().shape({
    phone: asyncValidationSchema(
      "phone",
      I18n.t("signup-phone-exists-error"),
      syncPhoneSchema,
      formik,
      country
    )
  });
};
