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

  console.log("data ===>", data);

  return (
    <AppView
      stretch
      onPress={props.onPress}
      {...props.rest}
      paddingHorizontal={3}
      marginBottom={5}
      marginHorizontal={6}
      height={15}
    >
      <AppView
        backgroundColor="#F4F2F0"
        borderRadius={7}
        paddingVertical={5}
        stretch
        flex
        marginLeft={15}
        paddingLeft={22}
      >
        <AppView row stretch>
          <AppView stretch flex marginHorizontal={4}>
            <AppView row spaceBetween stretch>
              <AppText bold>{data.ar_title}</AppText>
            </AppView>
            <AppView row spaceBetween stretch>
              <AppText numberOfLines={1}>{data.ar_description}</AppText>
            </AppView>
            <AppView row stretch bottomBorderWidth={1} bottomBorderColor="red">
              <AppText numberOfLines={1}>{I18n.t("days")} :</AppText>
              <AppText numberOfLines={1} marginHorizontal={1}>
                {data.duration > 0 ? data.duration : 1}
              </AppText>
            </AppView>
            <AppView row stretch bottomBorderWidth={1} bottomBorderColor="red">
              <AppText numberOfLines={1}>{I18n.t("date")} :</AppText>
              <AppText numberOfLines={1} marginHorizontal={1}>
                {moment(data.date_from).format("Do-MMM-YYYY")}
              </AppText>
            </AppView>
          </AppView>
          <LeftItem>{props.leftItem}</LeftItem>
        </AppView>
      </AppView>
      <AppView
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
        }}
        center
        height={15}
        width={25}
      >
        <AppImage
          source={{
            uri: `http://ejarly.dev.fudexsb.com/uploads/${data.photos[0]}`,
          }}
          // equalSize={20}
          borderRadius={7}
          height={12}
          width={25}
          stretch
          elevation={2}
        />
      </AppView>
    </AppView>
  );
};
const LeftItem = (props) => {
  return <AppView {...props.style}>{props.children}</AppView>;
};
