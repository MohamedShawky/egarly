import React, { Component, useEffect, useState } from "react";
import {
  AppView,
  AppImage,
  AppText,
  AppIcon,
  AppNavigation,
} from "../../common";
import Avatar from "../../assets/imgs/avatar.png";
import moment from "moment";
import { getPlaceName } from "../../utils";
export default (props) => {
  const { total } = props.data;
  const [location, loactionPlaceName] = useState(null);
  const {
    message,
    image,
    file,
    voice,
    created_at,
    order,
    user_id,
    to,
    order_id,
  } = props.data.message;
  
  const {
    ar_title,
    main_photo,
    latitude,
    longitude,
  } = order.products[0].product;
  useEffect(() => {
    if (latitude) getPlace();
  }, []);

  const getPlace = async () => {
    const res = await getPlaceName(latitude, longitude, true);
    console.log("res--->", res);
    loactionPlaceName(res);
  };
  let msg = null;
  if (message) {
    msg = message;
  } else if (location) {
    msg = "ارسل لوكايشن";
  } else if (image) {
    msg = "ارسل صوره";
  } else if (file) {
    msg = "ارسل ملف";
  } else if (voice) {
    msg = "ارسل تسجيل صوتي";
  }

  return (
    <AppView
      stretch
      {...props}
      row
      height={15}
      paddingHorizontal={5}
      backgroundColor="white"
      marginBottom={2}
      onPress={() => {
        AppNavigation.push({
          name: "chat",
          passProps: {
            owner_id: to,
            order_id: order_id,
          },
        });
      }}
    >
      <AppView stretch center borderRadius={7}>
        <AppView stretch equalSize={25} borderRadius={7}>
          <AppImage
            source={{
              uri: `http://ejarly.dev.fudexsb.com/uploads/${main_photo}`,
            }}
            equalSize={25}
            stretch
            backgroundColor="red"
          />
        </AppView>
      </AppView>

      <AppView stretch marginHorizontal={2} flex>
        <AppText numberOfLines={1} bold>
          {ar_title}
        </AppText>
        <AppText numberOfLines={1}>{msg}</AppText>
        <AppView row flex stretch spaceBetween>
          <AppView row width={30}>
            <AppText numberOfLines={1}>{location}</AppText>
            <AppIcon name="location-on" type={"material"} color="primary" />
          </AppView>
          <AppText>{moment(created_at).fromNow()}</AppText>
        </AppView>
      </AppView>
    </AppView>
  );
};
