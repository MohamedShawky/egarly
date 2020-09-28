import * as yup from "yup";
import I18n from "react-native-i18n";
import moment from "moment";

export default () =>
  yup.object().shape({
    reason: yup.string().required(I18n.t("input-required-error")),
    comment: yup.string().required(I18n.t("input-required-error")),
  });
