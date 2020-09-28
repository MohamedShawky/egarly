import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchema = () =>
  yup.object().shape({
    alias: yup.string().when("addToAddressBook", {
      is: true,
      then: yup.string().required(I18n.t("signup-field-required"))
    }),
    addressInDetails: yup.string().required(I18n.t("signup-field-required")),
    location: yup.string().required(I18n.t("signup-field-required")),
    city: yup.string().required(I18n.t("signup-field-required")),
    area: yup.string().required(I18n.t("signup-field-required")),
    addToAddressBook: yup.boolean()
  });
