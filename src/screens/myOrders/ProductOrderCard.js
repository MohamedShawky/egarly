import React, { useState } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppIcon,
  AppNavigation,
  AppImage,
  AppPrice,
  AppButton,
  AppStarRating,
  AppInput,
} from "../../common";
import product from "../../assets/imgs/product.png";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import avatar from "../../assets/imgs/avatar.png";
import moment from "moment";

export default (props) => {
  const { data } = props;
  if (!data) return null;

  const { product } = data;
  if (product === null) {
    return null;
  }
  console.log("product", product);

  return (
    <AppView
      stretch
      onPress={props.onPress}
      {...props.rest}
      paddingVertical={5}
      backgroundColor="#F4F2F0"
      paddingHorizontal={3}
      marginBottom={5}
      marginHorizontal={6}
      borderRadius={7}
    >
      <AppView row stretch>
        <AppImage
          source={{
            uri: `http://ejarly.dev.fudexsb.com/uploads/${product.main_photo}`,
          }}
          equalSize={20}
          stretch
        />
        <AppView stretch flex marginHorizontal={4}>
          <AppView row spaceBetween stretch>
            <AppText bold>{product.ar_title}</AppText>
          </AppView>
          <AppView row spaceBetween stretch>
            <AppText bold>{product.ar_title}</AppText>
          </AppView>
          <AppText bold size={4.5} numberOfLines={1}>
            {moment(data.from_date).format("Do-MM-YYYY")} الي
            {moment(data.to_date).format("Do-MM-YYYY")}
          </AppText>
        </AppView>
        <LeftItem>{props.leftItem}</LeftItem>
      </AppView>
    </AppView>
  );
};
const LeftItem = (props) => {
  return <AppView {...props.style}>{props.children}</AppView>;
};
