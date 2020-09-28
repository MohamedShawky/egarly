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
import { ImagePicker } from "..";

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
      <AppScrollView stretch horizontal row alwaysBounceHorizontal={false} showsHorizontalScrollIndicator={false}>
        <AppView equalSize={22} marginLeft={5} marginRight={props.rtl ? 0 : 5} >
          <ImagePicker
            maxImages={1}
            upload
            editable
            onChange={(imgs) => {
              props.handleChange("images1")(imgs);
            }}
            isTouched={props.touched.images}
            error={props.errors.images}
            view
            errorTextMarginHorizontal
            pickImage
            noValidation
          />
        </AppView>
        <AppView equalSize={22}>
          <ImagePicker
            maxImages={1}
            upload
            editable
            onChange={(imgs) => {
              props.handleChange("images2")(imgs);
            }}
            isTouched={props.touched.images}
            error={props.errors.images}
            view
            errorTextMarginHorizontal
            pickImage
            noValidation
          />
        </AppView>
        <AppView marginRight={5}>
          <ImagePicker
            maxImages={4}
            requiredImages={1}
            row
            pickImage
            upload
            editable
            marginHorizontalPick
            onChange={(imgs) => {
              props.handleChange("images3")(imgs);
            }}
            isTouched={props.touched.images}
            error={props.errors.images}
            // noValidation
            errorTextMarginHorizontal
            // view
          />
        </AppView>
      </AppScrollView>
    </AppView>
  );
};
