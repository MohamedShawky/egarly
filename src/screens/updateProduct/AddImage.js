import React, { useState } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppIcon,
  AppNavigation,
  AppInputError,
  AppScrollView,
} from "../../common";
import { ImagePicker } from "../../components";

export default (props) => {
  const { values } = props;


  return (
    <AppView stretch {...props.rest}>
      <AppView row stretch>
        <AppText bold> {I18n.t("label-image")}</AppText>
        <AppText color="#FF9292" size={8}>
          *
        </AppText>
      </AppView>
      <AppText size={5} color="labelText" marginVertical={5}>
        ( {I18n.t("label-image-hint")})
      </AppText>
      <AppScrollView
        stretch
        horizontal
        row
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
      >
        <AppView>
          <ImagePicker
            maxImages={7}
            // requiredImages={3}
            row
            pickImage
            upload
            editable
            // name="images"
            marginHorizontalPick
            onChange={(imgs) => {
              console.log("imgs",imgs);
              
              props.handleChange("images")(imgs);
            }}
            isTouched={props.touched.images}
            error={props.errors.images}
            // noValidation
            errorTextMarginHorizontal
            data={values.images}
            // view
          />
        </AppView>
      </AppScrollView>
    </AppView>
  );
};
