import React, { useState } from "react";
import I18n from "react-native-i18n";
import { AppView, AppText, AppIcon, AppInput } from "../../common";

export default props => {
  const { values, handleBlur, handleChange, errors, touched } = props;
  return (
    <AppView stretch {...props.rest}>
      <AppView row stretch >
        <AppText bold> {I18n.t("label-address")}</AppText>
        <AppText color="#FF9292"  size={8}>*</AppText>

      </AppView>
      <AppInput
        placeholder={I18n.t("product-name")}
        initialValue={values.ar_title}
        onBlur={handleBlur("ar_title")}
        onChange={handleChange("ar_title")}
        error={errors.ar_title}
        height={6}
        isTouched={touched.ar_title}
      />

      <AppView row stretch marginVertical={5}>
        <AppText bold> {I18n.t("label-desc")}</AppText>
        <AppText color="#FF9292"  size={8}>*</AppText>
      </AppView>
      <AppText size={5} color="labelText" marginBottom={5}>
        ( {I18n.t("product-desc")})
      </AppText>
      <AppInput
        placeholder={I18n.t("label-desc")}
        height={20}
        multiline
        initialValue={values.ar_description}
        onBlur={handleBlur("ar_description")}
        onChange={handleChange("ar_description")}
        error={errors.ar_description}
        isTouched={touched.ar_description}
      />
    </AppView>
  );
};
