import * as yup from "yup";
import I18n from "react-native-i18n";
import moment from "moment";

export default () =>
  yup.object().shape({
    from_date: yup.string().required(I18n.t("input-required-error")),
    to_date: yup.string().required(I18n.t("input-required-error")),
    distinction_status_id: yup.string().required(I18n.t("input-required-error")),
    message: yup.string().required(I18n.t("input-required-error")),
    // price_per_day:  yup.string().required(I18n.t("input-required-error")),
    // price_per_week:  yup.string().required(I18n.t("input-required-error")),
    // price_per_month:  yup.string().required(I18n.t("input-required-error"))
    
  });
