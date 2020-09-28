import React from "react";
import { AppButton, AppIcon, AppText, AppView, AppImage } from "../common";
import store from "../store";

export default props => {
  const {
    name,
    type,
    color,
    iconSize,
    textSize,
    title,
    image,
    socialImage,
    size,
    ...rest
  } = props;
  return (
    <AppView {...rest} center>
      <AppImage
        source={socialImage}
        resizeMode="contain"
        equalSize={size}
        center
      />
    </AppView>
  );
};
