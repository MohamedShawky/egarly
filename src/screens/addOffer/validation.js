import React from "react";
import * as yup from "yup";
import I18n from "react-native-i18n";

export default () =>
  yup.object().shape({
    ar_title: yup.string().required(`${I18n.t("input-required-error")}`),
    categories: yup.string().required(`${I18n.t("input-required-error")}`),
    price_from: yup.string().required(`${I18n.t("input-required-error")}`),
    price_to: yup.string().required(`${I18n.t("input-required-error")}`),
    latitude: yup.string().required(`${I18n.t("input-required-error")}`),
    date_from: yup.string().required(`${I18n.t("input-required-error")}`),
    date_to: yup.string().required(`${I18n.t("input-required-error")}`),




   
    images1: yup.string().required(`${I18n.t("input-required-error")}`),
   
  });
