import * as yup from "yup";
import I18n from "react-native-i18n";
import moment from "moment";

export default () =>
  yup.object().shape({
    from_date: yup.string().required(I18n.t("input-required-error")),
    to_date: yup.string().required(I18n.t("input-required-error")),
    note: yup.string().required(I18n.t("input-required-error")),
    quantity: yup.string().required(I18n.t("input-required-error")),
    
  });
