import * as yup from "yup";
import I18n from "react-native-i18n";
import { asyncValidationSchemaAddressBook } from "../../utils/validation";

export const buildValidationSchema = (formik, address = null) =>
  yup.object().shape({
    homeAddress: asyncValidationSchemaAddressBook(
      "homeAddress",
      I18n.t("add-address-exists-error"),
      yup.string().required(I18n.t("signup-field-required")),
      formik,
      address
    ),

    addressInDetails: yup.string().required(I18n.t("signup-field-required")),
    location: yup.string().required(I18n.t("signup-field-required")),
    city: yup.string().required(I18n.t("signup-field-required")),
    district: yup.string().required(I18n.t("signup-field-required"))
  });
