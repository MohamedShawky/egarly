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
    images: yup
      .string()
      .required(`${I18n.t("input-required-error")}`)
      .test("images", I18n.t("input-required-error"), function(value) {


        const dateToArray=[]
        dateToArray.push(value.split(','))

        const val=[value]
        console.log("test value", dateToArray);

        
        if (dateToArray[0].length >= 3) {
          return true;
        } else {
          return false;
        }
      }),
   
  });
