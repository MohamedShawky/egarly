import React from "react";
import * as yup from "yup";
import I18n from "react-native-i18n";

export default () =>
  yup.object().shape({
    ar_title: yup.string().required(`${I18n.t("input-required-error")}`),
    categories: yup.string().required(`${I18n.t("input-required-error")}`),
    // quantity: yup.string().required(`${I18n.t("input-required-error")}`),
    price_per_day: yup.string().required(`${I18n.t("input-required-error")}`),
    // price_per_week: yup.string().required(`${I18n.t("input-required-error")}`),
    // price_per_month: yup.string().required(`${I18n.t("input-required-error")}`),
    status: yup.string().required(`${I18n.t("input-required-error")}`),
    images1: yup.string().required(`${I18n.t("input-required-error")}`),
    // images2: yup.string().required(`${I18n.t("input-required-error")}`),
    // images3: yup.string().required(`${I18n.t("input-required-error")}`),

    
    // replacement_cost: yup.string().required(`${I18n.t("input-required-error")}`)
  });
